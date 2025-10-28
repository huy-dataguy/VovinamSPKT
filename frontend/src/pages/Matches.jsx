import React from 'react';
import { useFetchAllMatchesQuery } from '../redux/features/matchAPI';
import MatchTable from '../components/MatchTable';

const MatchesPage = () => {
  const { data: matches = [], isLoading, isError } = useFetchAllMatchesQuery();

  if (isLoading) return <p>Đang tải danh sách trận đấu...</p>;
  if (isError) return <p>Lỗi tải dữ liệu trận đấu.</p>;

  return (
    <div className="flex flex-col items-center py-12 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Danh sách trận đấu</h1>
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-6xl">
        <MatchTable matches={matches} />
      </div>
    </div>
  );
};

export default MatchesPage;
