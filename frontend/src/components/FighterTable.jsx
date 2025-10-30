import React, { useState, useEffect } from 'react';
import { useDeleteFighterMutation, useUpdateFighterMutation } from '../redux/features/fighterAPI';
import { useAddMatchMutation } from '../redux/features/matchAPI';
import { useAuth } from '../context/AuthContext'; // ✅ Thêm dòng này

const FighterTable = ({ fighters = [], selectable = false, onPairSelected, resetTrigger }) => {
  const [selected, setSelected] = useState({ fighter1: null, fighter2: null });
  const [editFighter, setEditFighter] = useState(null);
  const [formData, setFormData] = useState({ name: '', gender: '', weight: '', belt: '', club: '', birthYear: '' });
  const [genderFilter, setGenderFilter] = useState('All');
  const [tolerance, setTolerance] = useState(2);
  const [autoPairs, setAutoPairs] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedPairs, setSelectedPairs] = useState({});
  const [loading, setLoading] = useState(false);

  const [deleteFighter] = useDeleteFighterMutation();
  const [updateFighter] = useUpdateFighterMutation();
  const [addMatch] = useAddMatchMutation();
  const { isLoggedIn } = useAuth(); // ✅ Lấy trạng thái đăng nhập từ context

  // ================== CHỌN CẶP ==================
  const handleSelect = (id) => {
    if (!selectable) return;
    if (selected.fighter1 === id) setSelected(prev => ({ ...prev, fighter1: null }));
    else if (selected.fighter2 === id) setSelected(prev => ({ ...prev, fighter2: null }));
    else {
      if (!selected.fighter1) setSelected(prev => ({ ...prev, fighter1: id }));
      else if (!selected.fighter2) setSelected(prev => ({ ...prev, fighter2: id }));
      else alert('Chỉ được chọn tối đa 2 võ sinh.');
    }
  };

  useEffect(() => {
    onPairSelected && onPairSelected(
      selected.fighter1 && selected.fighter2 ? [selected.fighter1, selected.fighter2] : []
    );
  }, [selected, onPairSelected]);

  useEffect(() => setSelected({ fighter1: null, fighter2: null }), [resetTrigger]);

  // ================== QUẢN LÝ ==================
  const handleDelete = async (id) => {
    if (!isLoggedIn) return alert('Bạn cần đăng nhập admin để xóa võ sinh.');

    if (window.confirm('Bạn có chắc muốn xóa võ sinh này?')) {
      try {
        await deleteFighter(id).unwrap();
        alert('Xóa thành công!');
      } catch (err) {
        console.error(err);
        alert('Xóa thất bại!');
      }
    }
  };

  const handleEdit = (fighter) => {
    if (!isLoggedIn) return alert('Bạn cần đăng nhập admin để chỉnh sửa.');
    setEditFighter(fighter);
    setFormData({
      name: fighter.name,
      gender: fighter.gender,
      weight: fighter.weight,
      belt: fighter.belt,
      club: fighter.club || '',
      birthYear: fighter.birthYear || '',
    });
  };

  const handleSave = async () => {
    if (!isLoggedIn) return alert('Bạn cần đăng nhập admin để lưu thay đổi.');

    try {
      await updateFighter({ id: editFighter._id, ...formData }).unwrap();
      alert('Cập nhật thành công!');
      setEditFighter(null);
    } catch (err) {
      console.error(err);
      alert('Cập nhật thất bại!');
    }
  };

  // ================== GHÉP CẶP ==================
  const handleAutoPair = () => {
    if (!isLoggedIn) return alert('Chỉ admin mới có thể tự động xếp cặp.');

    const pairs = [];
    const grouped = fighters.reduce((acc, f) => {
      acc[f.gender] = acc[f.gender] || [];
      acc[f.gender].push(f);
      return acc;
    }, {});

    Object.keys(grouped).forEach(gender => {
      const sorted = [...grouped[gender]].sort((a, b) => a.weight - b.weight);
      const used = new Set();
      for (let i = 0; i < sorted.length; i++) {
        if (used.has(sorted[i]._id)) continue;
        for (let j = i + 1; j < sorted.length; j++) {
          if (used.has(sorted[j]._id)) continue;
          const diff = Math.abs(sorted[i].weight - sorted[j].weight);
          if (diff <= tolerance) {
            pairs.push({ gender, f1: sorted[i], f2: sorted[j] });
            used.add(sorted[i]._id);
            used.add(sorted[j]._id);
            break;
          }
        }
      }
    });

    if (pairs.length === 0) return alert('Không tìm được cặp phù hợp.');

    setAutoPairs(pairs);
    const defaults = {};
    pairs.forEach((_, i) => (defaults[i] = true));
    setSelectedPairs(defaults);
    setShowPopup(true);
  };

  const toggleAllPairs = (checked) => {
    const newState = {};
    autoPairs.forEach((_, i) => (newState[i] = checked));
    setSelectedPairs(newState);
  };

  const handleConfirmMatch = async () => {
    if (!isLoggedIn) return alert('Chỉ admin mới có thể xác nhận tạo trận.');

    const confirmed = autoPairs.filter((_, idx) => selectedPairs[idx]);
    if (confirmed.length === 0) return alert('Chưa chọn cặp nào.');

    try {
      setLoading(true);
      for (const pair of confirmed) {
        const payload = {
          tournamentId: '671f45e8339d27ab4b8fbc01',
          fighters: [pair.f1._id, pair.f2._id],
          round: 'Vòng loại',
        };
        await addMatch(payload).unwrap();
      }
      alert('Tạo cặp đấu thành công!');
      setShowPopup(false);
    } catch (err) {
      alert(`Lỗi: ${err?.data?.message || 'Không thể tạo trận'}`);
    } finally {
      setLoading(false);
    }
  };

  const filteredFighters = fighters
    .filter(f => genderFilter === 'All' || f.gender === genderFilter)
    .sort((a, b) => a.weight - b.weight);

  return (
    <div>
      {/* Bộ lọc + tự động ghép cặp */}
      <div className="mb-4 flex gap-4 items-center flex-wrap">
        <label className="font-semibold">Bộ lọc</label>
        <select
          className="border p-1 rounded"
          value={genderFilter}
          onChange={e => setGenderFilter(e.target.value)}
        >
          <option value="All">Tất cả</option>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
        </select>

        <div className="flex items-center gap-2">
          <label>Độ lệch (kg):</label>
          <input
            type="number"
            value={tolerance}
            onChange={e => setTolerance(Number(e.target.value))}
            className="border p-1 w-20 rounded"
          />
          <button
            onClick={handleAutoPair}
            className={`px-3 py-1 rounded text-white ${
              isLoggedIn ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Tự động xếp cặp
          </button>
        </div>
      </div>

      {/* Bảng võ sinh */}
      <div className="overflow-auto">
        <table className="w-full border-collapse border border-gray-300 text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">#</th>
              {selectable && <th className="border p-2">Chọn</th>}
              <th className="border p-2">Tên</th>
              <th className="border p-2">Giới tính</th>
              <th className="border p-2">Cân nặng (kg)</th>
              <th className="border p-2">Cấp đai</th>
              <th className="border p-2">Cập nhật</th>
              <th className="border p-2">Xóa</th>
            </tr>
          </thead>
          <tbody>
            {filteredFighters.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-4">Chưa có võ sinh</td>
              </tr>
            ) : filteredFighters.map((f, i) => (
              <tr
                key={f._id || i}
                className={`odd:bg-white even:bg-gray-50 
                  ${selected.fighter1 === f._id ? 'bg-orange-200' : ''}
                  ${selected.fighter2 === f._id ? 'bg-blue-200' : ''}`}
              >
                <td className="border p-2">{i + 1}</td>
                {selectable && (
                  <td className="border p-2">
                    <input
                      type="checkbox"
                      checked={selected.fighter1 === f._id || selected.fighter2 === f._id}
                      onChange={() => handleSelect(f._id)}
                    />
                  </td>
                )}
                <td className="border p-2">{f.name}</td>
                <td className="border p-2">{f.gender}</td>
                <td className="border p-2">{f.weight}</td>
                <td className="border p-2">{f.belt}</td>
                <td className="border p-2">
                  <button
                    className={`px-2 py-1 rounded ${
                      isLoggedIn ? 'bg-yellow-400 hover:bg-yellow-500' : 'bg-gray-300 cursor-not-allowed'
                    }`}
                    onClick={() => handleEdit(f)}
                    disabled={!isLoggedIn}
                  >
                    Cập nhật
                  </button>
                </td>
                <td className="border p-2">
                  <button
                    className={`px-2 py-1 rounded text-white ${
                      isLoggedIn ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-400 cursor-not-allowed'
                    }`}
                    onClick={() => handleDelete(f._id)}
                    disabled={!isLoggedIn}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup ghép cặp */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[600px] p-6 max-h-[80vh] overflow-auto">
            <h2 className="text-lg font-bold mb-4">Kết quả xếp cặp</h2>
            <div className="flex items-center mb-3">
              <input
                type="checkbox"
                className="mr-2"
                checked={Object.values(selectedPairs).every(v => v)}
                onChange={e => toggleAllPairs(e.target.checked)}
              />
              <label>Chọn tất cả</label>
            </div>

            <table className="w-full border border-gray-300 text-center mb-4">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Chọn</th>
                  <th className="border p-2">Giới tính</th>
                  <th className="border p-2">Võ sinh 1</th>
                  <th className="border p-2">Võ sinh 2</th>
                  <th className="border p-2">Chênh lệch (kg)</th>
                </tr>
              </thead>
              <tbody>
                {autoPairs.map((pair, i) => (
                  <tr key={i} className="odd:bg-white even:bg-gray-50">
                    <td className="border p-2">
                      <input
                        type="checkbox"
                        checked={!!selectedPairs[i]}
                        onChange={e => setSelectedPairs(prev => ({ ...prev, [i]: e.target.checked }))}
                      />
                    </td>
                    <td className="border p-2">{pair.gender}</td>
                    <td className="border p-2">{pair.f1.name} ({pair.f1.weight}kg)</td>
                    <td className="border p-2">{pair.f2.name} ({pair.f2.weight}kg)</td>
                    <td className="border p-2">{Math.abs(pair.f1.weight - pair.f2.weight)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end gap-3">
              <button
                className="bg-gray-400 text-white px-3 py-1 rounded"
                onClick={() => setShowPopup(false)}
              >
                Hủy
              </button>
              <button
                disabled={loading || !isLoggedIn}
                className={`text-white px-3 py-1 rounded ${
                  isLoggedIn
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
                onClick={handleConfirmMatch}
              >
                {loading ? 'Đang tạo...' : 'Xác nhận tạo trận'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal cập nhật võ sinh */}
      {editFighter && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Cập nhật võ sinh</h2>
            <input className="w-full mb-2 border p-1" placeholder="Tên" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
            <input className="w-full mb-2 border p-1" placeholder="Giới tính" value={formData.gender} onChange={e => setFormData({ ...formData, gender: e.target.value })} />
            <input className="w-full mb-2 border p-1" placeholder="Cân nặng" type="number" value={formData.weight} onChange={e => setFormData({ ...formData, weight: e.target.value })} />
            <input className="w-full mb-2 border p-1" placeholder="Cấp đai" value={formData.belt} onChange={e => setFormData({ ...formData, belt: e.target.value })} />
            <input className="w-full mb-2 border p-1" placeholder="Câu lạc bộ" value={formData.club} onChange={e => setFormData({ ...formData, club: e.target.value })} />
            <input className="w-full mb-4 border p-1" placeholder="Năm sinh" type="number" value={formData.birthYear} onChange={e => setFormData({ ...formData, birthYear: e.target.value })} />
            <div className="flex justify-end gap-2">
              <button className="bg-gray-300 px-3 py-1 rounded" onClick={() => setEditFighter(null)}>Hủy</button>
              <button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={handleSave}>Lưu</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FighterTable;
