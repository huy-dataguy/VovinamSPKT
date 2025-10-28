import React, { useState } from 'react';
import { useFetchAllFighterQuery } from '../redux/features/fighterAPI';
import { useAddMatchMutation } from '../redux/features/matchAPI';

const MatchesPage = () => {
  const { data: fighters = [] } = useFetchAllFighterQuery();
  const [addMatch] = useAddMatchMutation();
  const [pair, setPair] = useState({ fighter1: '', fighter2: '' });
  const [loading, setLoading] = useState(false);

  const handleCreateMatch = async (e) => {
    e.preventDefault();

    if (pair.fighter1 === pair.fighter2 || !pair.fighter1 || !pair.fighter2) {
      alert('Vui lòng chọn 2 võ sinh khác nhau.');
      return;
    }

    const matchPayload = {
      tournamentId: "671f45e8339d27ab4b8fbc01", // tạm hardcode hoặc lấy từ select tournament
      fighters: [pair.fighter1, pair.fighter2],
      round: "Vòng loại"
    };

    console.log("📤 Sending match data to backend:", matchPayload);

    try {
      setLoading(true);
      const result = await addMatch(matchPayload).unwrap();
      console.log("✅ Match created successfully:", result);
      alert('Tạo cặp đấu thành công!');
      setPair({ fighter1: '', fighter2: '' });
    } catch (err) {
      console.error("❌ Error creating match:", err);
      alert(`Lỗi: ${err?.data?.message || 'Không thể tạo cặp đấu'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center py-12 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Ghép cặp thi đấu</h1>
      <form onSubmit={handleCreateMatch} className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <select
          value={pair.fighter1}
          onChange={(e) => setPair({ ...pair, fighter1: e.target.value })}
          className="border p-2 rounded-md"
          required
        >
          <option value="">Chọn võ sinh 1</option>
          {fighters.map(f => (
            <option key={f._id} value={f._id}>{f.name}</option>
          ))}
        </select>

        <select
          value={pair.fighter2}
          onChange={(e) => setPair({ ...pair, fighter2: e.target.value })}
          className="border p-2 rounded-md"
          required
        >
          <option value="">Chọn võ sinh 2</option>
          {fighters.map(f => (
            <option key={f._id} value={f._id}>{f.name}</option>
          ))}
        </select>

        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 ${loading && 'opacity-50 cursor-not-allowed'}`}
        >
          {loading ? 'Đang tạo...' : 'Xác nhận cặp đấu'}
        </button>
      </form>
    </div>
  );
};

export default MatchesPage;
