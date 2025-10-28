import React from 'react';
import { useFetchAllFighterQuery } from '../redux/features/fighterAPI';

const Dashboard = () => {
  const { data: fighters = [] } = useFetchAllFighterQuery();

  const total = fighters.length;
  const male = fighters.filter(f => f.gender === 'Nam').length;
  const female = fighters.filter(f => f.gender === 'Nữ').length;

  // Tính tần suất cấp đai
  const beltCounts = fighters.reduce((acc, f) => {
    acc[f.belt] = (acc[f.belt] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
        <h3 className="text-sm font-medium">Tổng số võ sinh</h3>
        <p className="text-3xl font-bold mt-4">{total}</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h3 className="text-sm font-medium mb-4">Phân bố giới tính</h3>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="text-sm">Nam</div>
            <div className="text-xl font-semibold">{male}</div>
          </div>
          <div className="flex-1">
            <div className="text-sm">Nữ</div>
            <div className="text-xl font-semibold">{female}</div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h3 className="text-sm font-medium mb-4">Cấp đai phổ biến</h3>
        <ul className="text-sm space-y-2">
          {Object.keys(beltCounts).length === 0 && <li>Chưa có dữ liệu</li>}
          {Object.entries(beltCounts).map(([belt, count]) => (
            <li key={belt} className="flex justify-between">
              <span>{belt}</span>
              <span className="font-semibold">{count}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
