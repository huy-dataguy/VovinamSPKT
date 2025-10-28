import React, { useState } from 'react';
import { useFetchAllFighterQuery } from '../redux/features/fighterAPI';
import { useAddMatchMutation } from '../redux/features/matchAPI';

const MatchForm = () => {
  const { data: fighters = [], isLoading: fightersLoading } = useFetchAllFighterQuery();
  const [addMatch, { isLoading }] = useAddMatchMutation();

  const [pair, setPair] = useState({ fighter1: '', fighter2: '', gender: '', weightClass: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pair.fighter1 || !pair.fighter2) {
      alert('Chọn đủ 2 võ sinh');
      return;
    }
    if (pair.fighter1 === pair.fighter2) {
      alert('Phải chọn 2 võ sinh khác nhau');
      return;
    }

    const payload = {
      tournamentId: null, // nếu bạn có tournament, set id ở đây
      fighters: [pair.fighter1, pair.fighter2],
      gender: pair.gender || undefined,
      weightClass: pair.weightClass || undefined,
    };

    try {
      await addMatch(payload).unwrap();
      alert('Tạo cặp đấu thành công');
      setPair({ fighter1: '', fighter2: '', gender: '', weightClass: '' });
    } catch (err) {
      console.error('Lỗi tạo cặp đấu:', err);
      alert('Tạo cặp đấu thất bại');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
      <label>Chọn võ sinh 1</label>
      <select
        value={pair.fighter1}
        onChange={(e) => setPair({ ...pair, fighter1: e.target.value })}
        required
        className="border p-2 rounded-md"
      >
        <option value="">Chọn</option>
        {fighters.map((f) => (
          <option key={f._id} value={f._id}>{`${f.name} - ${f.weight}kg`}</option>
        ))}
      </select>

      <label>Chọn võ sinh 2</label>
      <select
        value={pair.fighter2}
        onChange={(e) => setPair({ ...pair, fighter2: e.target.value })}
        required
        className="border p-2 rounded-md"
      >
        <option value="">Chọn</option>
        {fighters.map((f) => (
          <option key={f._id} value={f._id}>{`${f.name} - ${f.weight}kg`}</option>
        ))}
      </select>

      <label>Giới tính trận đấu (tùy chọn)</label>
      <select
        value={pair.gender}
        onChange={(e) => setPair({ ...pair, gender: e.target.value })}
        className="border p-2 rounded-md"
      >
        <option value="">Không chọn</option>
        <option value="Nam">Nam</option>
        <option value="Nữ">Nữ</option>
      </select>

      <label>Hạng cân / weight class (tùy chọn)</label>
      <input
        value={pair.weightClass}
        onChange={(e) => setPair({ ...pair, weightClass: e.target.value })}
        className="border p-2 rounded-md"
        placeholder="Ví dụ: 60-65kg"
      />

      <button
        type="submit"
        disabled={isLoading || fightersLoading}
        className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-60"
      >
        {isLoading ? 'Đang tạo...' : 'Xác nhận cặp đấu'}
      </button>
    </form>
  );
};

export default MatchForm;
