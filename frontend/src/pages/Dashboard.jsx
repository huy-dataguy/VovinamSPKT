import React from 'react';
import { useFetchAllFighterQuery } from '../redux/features/fighterAPI';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const DashboardPage = () => {
  const { data: fighters = [] } = useFetchAllFighterQuery();

  const genderData = [
    { name: 'Nam', value: fighters.filter(f => f.gender === 'Nam').length, color: '#1E90FF' }, // xanh dương
    { name: 'Nữ', value: fighters.filter(f => f.gender === 'Nữ').length, color: '#FF69B4' },  // hồng
  ];

  return (
    <div className="flex flex-col items-center py-12 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-blue-700">Thống kê võ sinh</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-4xl">
        <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
          <h2 className="font-semibold text-xl mb-4">Tổng số võ sinh</h2>
          <p className="text-4xl font-bold text-blue-600">{fighters.length}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="font-semibold text-xl mb-4 text-center">Tỉ lệ giới tính</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={genderData}
                dataKey="value"
                nameKey="name"
                label
              >
                {genderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
