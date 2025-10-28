import React from 'react';
import { useFetchAllMatchesQuery } from '../redux/features/matchAPI';

/**
 * Hiển thị danh sách cặp đấu. File giả định endpoint trả match đã populate fighters.
 */
const MatchTable = () => {
  const { data: matches = [], isLoading, isError } = useFetchAllMatchesQuery();

  if (isLoading) return <p>Đang tải danh sách cặp đấu...</p>;
  if (isError) return <p>Lỗi khi tải cặp đấu</p>;

  return (
    <div className="overflow-auto">
      <table className="w-full border-collapse border border-gray-300 text-center">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">Võ sinh 1</th>
            <th className="border p-2">Võ sinh 2</th>
            <th className="border p-2">Giới tính</th>
            <th className="border p-2">Hạng cân</th>
            <th className="border p-2">Kết quả</th>
          </tr>
        </thead>
        <tbody>
          {matches.length === 0 ? (
            <tr><td colSpan="6" className="p-4">Chưa có cặp đấu</td></tr>
          ) : matches.map((m, idx) => {
            const [f1, f2] = (m.fighters || []);
            const winnerId = m.result?.winner;
            return (
              <tr key={m._id || idx} className="odd:bg-white even:bg-gray-50">
                <td className="border p-2">{idx + 1}</td>
                <td className="border p-2">{f1?.name || (f1?._id || '—')}</td>
                <td className="border p-2">{f2?.name || (f2?._id || '—')}</td>
                <td className="border p-2">{m.gender || '—'}</td>
                <td className="border p-2">{m.weightClass || '—'}</td>
                <td className="border p-2">
                  {m.result?.winner ? (
                    <>
                      {m.result?.winner === f1?._id ? (f1?.name) : (f2?.name)}<br/>
                      {m.result?.score || ''}
                    </>
                  ) : 'Chưa đấu'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MatchTable;
