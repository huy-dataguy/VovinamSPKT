import React, { useState } from 'react';
import { useAddMatchMutation } from '../redux/features/matchAPI';
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

const WEIGHT_CLASSES = {
  male: [
    [42, 48], [49, 51], [52, 54], [55, 57],
    [58, 60], [61, 64], [65, 68], [69, 72],
    [73, 77], [78, 200]
  ],
  female: [
    [36, 42], [43, 45], [46, 48], [49, 51],
    [52, 54], [55, 57], [58, 60], [61, 63],
    [64, 66], [67, 200]
  ]
};

const AutoSort = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [addMatch] = useAddMatchMutation();
  const [loading, setLoading] = useState(false);

  const { fighters = [] } = location.state || {};

  const [bonusWeight, setBonusWeight] = useState(() => {
    const initial = {};
    fighters.forEach(f => {
      if (f.belt?.includes('Hoàng đai') || ['Lam đai II', 'Lam đai III'].includes(f.belt))
        initial[f._id] = 3;
    });
    return initial;
  });

  const [globalBonus, setGlobalBonus] = useState(3);
  const [pairs, setPairs] = useState([]);

  // Áp dụng cộng thêm cân nặng chung
  const applyGlobalBonus = () => {
    const updated = { ...bonusWeight };
    fighters.forEach(f => {
      if (f.belt?.includes('Hoàng đai') || ['Lam đai II', 'Lam đai III'].includes(f.belt))
        updated[f._id] = Number(globalBonus);
    });
    setBonusWeight(updated);
  };

  // Tính hạng cân
  const getWeightClass = (weight, gender) => {
    const list = WEIGHT_CLASSES[gender === 'Nam' ? 'male' : 'female'];
    for (const [min, max] of list) if (weight >= min && weight <= max) return `${min}-${max}`;
    return 'Khác';
  };

  // Tính cân nặng có bonus
  const calcAdjustedWeight = (f) => f.weight + (Number(bonusWeight[f._id]) || 0);

  // --- GHÉP CẶP ---
  const smartPairing = () => {
    const grouped = {};
    fighters.forEach(f => {
      const adjWeight = calcAdjustedWeight(f);
      const cls = getWeightClass(adjWeight, f.gender);
      if (!grouped[f.gender]) grouped[f.gender] = {};
      if (!grouped[f.gender][cls]) grouped[f.gender][cls] = [];
      grouped[f.gender][cls].push({ ...f, adjWeight });
    });

    const allPairs = [];
    const fightCount = {};
    const getMaxMatches = (fighter) =>
      ['Tự Vệ', 'Lam đai', 'Lam đai I'].includes(fighter.belt) ? 1 : 2;

    const addPair = (f1, f2, gender, cls) => {
      if (!f1 || !f2 || f1._id === f2._id) return;
      const f1Limit = getMaxMatches(f1);
      const f2Limit = getMaxMatches(f2);
      if ((fightCount[f1._id] || 0) >= f1Limit || (fightCount[f2._id] || 0) >= f2Limit) return;

      fightCount[f1._id] = (fightCount[f1._id] || 0) + 1;
      fightCount[f2._id] = (fightCount[f2._id] || 0) + 1;

      const exists = allPairs.some(
        p =>
          (p.f1._id === f1._id && p.f2._id === f2._id) ||
          (p.f1._id === f2._id && p.f2._id === f1._id)
      );
      if (!exists) allPairs.push({ gender, cls, f1, f2 });
    };

    Object.entries(grouped).forEach(([gender, byClass]) => {
      const classNames = Object.keys(byClass);
      classNames.sort((a, b) => parseInt(a.split('-')[0]) - parseInt(b.split('-')[0]));

      classNames.forEach((cls, idx) => {
        const list = [...byClass[cls]].sort(() => Math.random() - 0.5);

        while (list.length > 1) {
          const f1 = list.pop();
          const f2 = list.pop();
          addPair(f1, f2, gender, cls);
        }

        // Xử lý trường hợp lẻ
        if (list.length === 1) {
          const leftover = list.pop();
          if ((fightCount[leftover._id] || 0) < getMaxMatches(leftover)) {
            const neighbor =
              byClass[classNames[idx - 1]]?.find(
                f => (fightCount[f._id] || 0) < getMaxMatches(f)
              ) ||
              byClass[classNames[idx + 1]]?.find(
                f => (fightCount[f._id] || 0) < getMaxMatches(f)
              );

            if (neighbor) addPair(leftover, neighbor, gender, `${cls}*`);
          }
        }
      });
    });

    // 🔀 Random thứ tự trận đấu trước khi hiển thị
    const shuffled = [...allPairs].sort(() => Math.random() - 0.5);
    setPairs(shuffled);
  };

  // --- GỬI LÊN SERVER ---
  const handleConfirm = async () => {
    if (!isLoggedIn) return alert('❌ Chỉ admin mới có thể xác nhận tạo trận.');
    if (!pairs.length) return alert('⚠️ Chưa có cặp đấu nào.');

    try {
      setLoading(true);
      for (const pair of pairs) {
        await addMatch({
          tournamentId: '671f45e8339d27ab4b8fbc01',
          fighters: [pair.f1._id, pair.f2._id],
          round: 'Vòng loại',
        }).unwrap();
      }
      alert('✅ Đã tạo tất cả cặp đấu thành công!');
      navigate(-1);
    } catch (err) {
      alert(`❌ Lỗi: ${err?.data?.message || 'Không thể tạo trận'}`);
    } finally {
      setLoading(false);
    }
  };

  if (!fighters.length)
    return (
      <div className="p-6 text-center">
        <h2 className="text-lg font-bold mb-4">Không có dữ liệu võ sinh.</h2>
        <button onClick={() => navigate(-1)} className="bg-gray-500 text-white px-4 py-2 rounded">
          Quay lại
        </button>
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">Xếp cặp đấu tự động (Smart v4)</h1>

      {/* --- Nhập bonus chung --- */}
      <div className="flex items-center gap-3 mb-6">
        <label className="font-semibold">Cộng thêm +kg chung cho đẳng cấp cao:</label>
        <input
          type="number"
          min="0"
          value={globalBonus}
          onChange={e => setGlobalBonus(Number(e.target.value))}
          className="w-20 border rounded px-2 text-center"
        />
        <button
          onClick={applyGlobalBonus}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Áp dụng cho tất cả
        </button>
      </div>

      {/* --- Bảng danh sách --- */}
      <h2 className="text-lg font-semibold mb-2">Điều chỉnh cân nặng cá nhân (+kg)</h2>
      <table className="w-full mb-6 border border-gray-300 text-center">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Tên</th>
            <th className="border p-2">Giới tính</th>
            <th className="border p-2">Đai</th>
            <th className="border p-2">Cân nặng</th>
            <th className="border p-2">+kg</th>
          </tr>
        </thead>
        <tbody>
          {fighters.map(f => {
            const isHighRank =
              f.belt?.includes('Hoàng đai') ||
              ['Lam đai II', 'Lam đai III'].includes(f.belt);
            return (
              <tr key={f._id} className="odd:bg-white even:bg-gray-50">
                <td className="border p-2">{f.name}</td>
                <td className="border p-2">{f.gender}</td>
                <td className="border p-2">{f.belt}</td>
                <td className="border p-2">{f.weight}</td>
                <td className="border p-2">
                  {isHighRank ? (
                    <input
                      type="number"
                      min="0"
                      className="w-16 border rounded px-1 text-center"
                      value={bonusWeight[f._id] || 0}
                      onChange={e =>
                        setBonusWeight({
                          ...bonusWeight,
                          [f._id]: Number(e.target.value)
                        })
                      }
                    />
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <button
        onClick={smartPairing}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-6"
      >
        Xếp cặp
      </button>

      {/* --- Kết quả --- */}
      {pairs.length > 0 && (
        <>
          <h2 className="text-lg font-semibold mb-2 text-green-700">
            Kết quả ghép cặp ({pairs.length} trận, thứ tự ngẫu nhiên)
          </h2>
          <table className="w-full border border-gray-300 text-center mb-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">#</th>
                <th className="border p-2">Giới tính</th>
                <th className="border p-2">Hạng cân</th>
                <th className="border p-2">Võ sinh 1</th>
                <th className="border p-2">Võ sinh 2</th>
              </tr>
            </thead>
            <tbody>
              {pairs.map((p, idx) => (
                <tr key={idx} className="odd:bg-white even:bg-gray-50">
                  <td className="border p-2 font-semibold">{idx + 1}</td>
                  <td className="border p-2">{p.gender}</td>
                  <td className="border p-2">{p.cls}</td>
                  <td className="border p-2">{p.f1.name} ({p.f1.weight}kg)</td>
                  <td className="border p-2">{p.f2.name} ({p.f2.weight}kg)</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end gap-3">
            <button onClick={() => navigate(-1)} className="bg-gray-500 text-white px-3 py-1 rounded">
              Quay lại
            </button>
            <button
              onClick={handleConfirm}
              disabled={loading || !isLoggedIn}
              className={`text-white px-3 py-1 rounded ${
                isLoggedIn ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {loading ? 'Đang tạo...' : 'Xác nhận tạo tất cả trận'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AutoSort;
