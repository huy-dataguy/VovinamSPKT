import React, { useState } from 'react';
import FighterForm from '../components/FighterForm';
import FighterTable from '../components/FighterTable';
import { useFetchAllFighterQuery } from '../redux/features/fighterAPI';
import { useAddMatchMutation } from '../redux/features/matchAPI';

const FightersPage = () => {
  const { data: fighters = [], isLoading, isError } = useFetchAllFighterQuery();
  const [addMatch] = useAddMatchMutation();
  const [pair, setPair] = useState([]); // chứa 2 fighterId
  const [loading, setLoading] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(false);

  const handleConfirmPair = async () => {
    if (pair.length !== 2) {
      alert('Vui lòng chọn đủ 2 võ sinh để tạo cặp đấu.');
      return;
    }

    const payload = {
      tournamentId: "671f45e8339d27ab4b8fbc01",
      fighters: pair,
      round: "Vòng loại"
    };

    try {
      setLoading(true);
      await addMatch(payload).unwrap();
      alert('Tạo cặp đấu thành công!');
      setPair([]);
      setResetTrigger(prev => !prev); // trigger reset FighterTable
    } catch (err) {
      alert(`Lỗi: ${err?.data?.message || 'Không thể tạo cặp đấu'}`);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <p>Đang tải dữ liệu...</p>;
  if (isError) return <p>Lỗi tải danh sách võ sinh.</p>;

  return (
    <div className="flex flex-col items-center py-12 min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-8 font-[Montserrat] text-blue-700">
        Quản lý võ sinh & Ghép cặp đấu
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-6xl">
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <FighterForm />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg overflow-auto">
        <button
          onClick={handleConfirmPair}
          disabled={pair.length !== 2 || loading}
          className="mb-6 mt-4 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Đang tạo...' : 'Xác nhận cặp đấu'}
        </button>
          <FighterTable 
            fighters={fighters} 
            selectable={true} 
            onPairSelected={setPair} 
            resetTrigger={resetTrigger}
          />


        </div>
      </div>
    </div>
  );
};

export default FightersPage;
