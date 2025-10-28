import React from 'react';
import FighterForm from '../components/FighterForm';
import FighterTable from '../components/FighterTable';
import { useFetchAllFighterQuery } from '../redux/features/fighterAPI';

const FightersPage = () => {
  const { data: fighters = [], isLoading, isError } = useFetchAllFighterQuery();

  if (isLoading) return <p>Đang tải dữ liệu...</p>;
  if (isError) return <p>Lỗi tải danh sách võ sinh.</p>;

  return (
    <div className="flex flex-col items-center py-12 min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-8 font-[Montserrat] text-blue-700">
        Quản lý võ sinh
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-6xl">
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <FighterForm />
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-lg overflow-auto">
          <FighterTable fighters={fighters} />
        </div>
      </div>
    </div>
  );
};

export default FightersPage;
