import React, { useState } from 'react';
import { useFetchAllMatchesQuery, useUpdateResultMutation, useDeleteMatchMutation } from '../redux/features/matchAPI';

const MatchTable = () => {
  const { data: matches = [], isLoading, isError, refetch } = useFetchAllMatchesQuery();
  const [updateResult] = useUpdateResultMutation();
  const [deleteMatch] = useDeleteMatchMutation();
  const [updatingMatchId, setUpdatingMatchId] = useState(null);
  const [deletingMatchId, setDeletingMatchId] = useState(null);
  const [deletingAll, setDeletingAll] = useState(false);

  if (isLoading) return <p>Đang tải danh sách cặp đấu...</p>;
  if (isError) return <p>Lỗi khi tải cặp đấu</p>;

  const handleUpdateResult = async (match, winnerColor) => {
    setUpdatingMatchId(match._id);
    try {
      await updateResult({ id: match._id, result: { winner: winnerColor } }).unwrap();
      alert('Cập nhật kết quả thành công!');
      refetch();
    } catch (err) {
      console.error(err);
      alert('Cập nhật thất bại!');
    } finally {
      setUpdatingMatchId(null);
    }
  };

  const handleDeleteMatch = async (matchId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Bạn phải đăng nhập admin để xóa trận đấu');
      return;
    }

    // if (!window.confirm('Bạn có chắc muốn xóa trận đấu này?')) return;

    setDeletingMatchId(matchId);
    try {
      await deleteMatch(matchId).unwrap();
      alert('Xóa trận đấu thành công!');
      refetch();
    } catch (err) {
      console.error(err);
      if (err?.data?.message === 'Unauthorized') {
        alert('Bạn không có quyền xóa trận đấu. Vui lòng đăng nhập admin.');
      } else {
        alert('Xóa thất bại!');
      }
    } finally {
      setDeletingMatchId(null);
    }
  };

  const handleDeleteAllMatches = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Bạn phải đăng nhập admin để xóa các trận đấu.');
      return;
    }

    if (matches.length === 0) {
      alert('Không có trận nào để xóa.');
      return;
    }

    if (!window.confirm('Bạn có chắc muốn xóa TẤT CẢ các trận đấu không?')) return;

    setDeletingAll(true);
    try {
      for (const m of matches) {
        await deleteMatch(m._id).unwrap();
      }
      alert('Đã xóa tất cả trận đấu!');
      refetch();
    } catch (err) {
      console.error(err);
      alert('Lỗi khi xóa hàng loạt trận đấu.');
    } finally {
      setDeletingAll(false);
    }
  };

  const renderRows = (m, idx) => {
    const [redFighter, blueFighter] = m.fighters || [];
    const winner = m.result?.winner;

    const getWinnerName = () => {
      if (!winner) return '';
      return winner === 'Đỏ' ? redFighter?.name : blueFighter?.name;
    };

    return (
      <React.Fragment key={m._id}>
        <tr className="odd:bg-white even:bg-gray-50">
          <td className="border p-2" rowSpan="2">{idx}</td>
          <td className="border p-2 text-red-600 font-semibold">{redFighter?.name || '—'}</td>
          <td className="border p-2">{redFighter?.gender || '—'}</td>
          <td className="border p-2">{redFighter?.belt || '—'}</td>

          <td className="border p-2">{redFighter?.weight || '—'}</td>
          <td className="border p-2" rowSpan="2">
            {!winner ? (
              <>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleUpdateResult(m, 'Đỏ')}
                  disabled={updatingMatchId === m._id}
                >
                  Đỏ thắng
                </button>
                <button
                  className="bg-blue-600 text-white px-2 py-1 rounded"
                  onClick={() => handleUpdateResult(m, 'Xanh')}
                  disabled={updatingMatchId === m._id}
                >
                  Xanh thắng
                </button>
              </>
            ) : getWinnerName()}
          </td>
          <td className="border p-2" rowSpan="2">
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => handleDeleteMatch(m._id)}
              disabled={deletingMatchId === m._id}
            >
              Xóa trận
            </button>
          </td>
        </tr>
        <tr className="odd:bg-white even:bg-gray-50">
          <td className="border p-2 text-blue-600 font-semibold">{blueFighter?.name || '—'}</td>
          <td className="border p-2">{blueFighter?.gender || '—'}</td>
          <td className="border p-2">{blueFighter?.belt || '—'}</td>

          <td className="border p-2">{blueFighter?.weight || '—'}</td>
        </tr>
      </React.Fragment>
    );
  };

  return (
    <div className="overflow-auto">
      {/* Header controls */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold">Danh sách cặp đấu</h2>
        <button
          className={`bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 ${deletingAll ? 'opacity-60 cursor-not-allowed' : ''}`}
          onClick={handleDeleteAllMatches}
          disabled={deletingAll}
        >
          {deletingAll ? 'Đang xóa tất cả...' : '🗑️ Xóa tất cả trận đấu'}
        </button>
      </div>

      {/* Match table */}
      <table className="w-full border-collapse border border-gray-300 text-center">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Cặp đấu</th>
            <th className="border p-2">Tên võ sinh</th>
            <th className="border p-2">Giới tính</th>
            <th className="border p-2">Cấp đai</th>

            <th className="border p-2">Cân nặng</th>
            <th className="border p-2">Kết quả</th>
            <th className="border p-2">Xóa trận</th>
          </tr>
        </thead>
        <tbody>
          {matches.length === 0 ? (
            <tr>
              <td colSpan="6" className="p-4">Chưa có cặp đấu</td>
            </tr>
          ) : (
            matches.map((m, idx) => renderRows(m, idx + 1))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MatchTable;
