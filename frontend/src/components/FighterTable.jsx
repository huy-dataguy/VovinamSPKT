import React from 'react';

/**
 * props:
 *  - fighters: array võ sinh
 *  - selectable: boolean (nếu true thêm checkbox để chọn dùng cho ghép cặp)
 *  - onSelect: (id, checked) => void
 */
const FighterTable = ({ fighters = [], selectable = true, onSelect }) => {
  return (
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
          </tr>
        </thead>
        <tbody>
          {fighters.length === 0 ? (
            <tr>
              <td colSpan={selectable ? 6 : 5} className="p-4">Chưa có võ sinh</td>
            </tr>
          ) : (
            fighters.map((f, i) => (
              <tr key={f._id || i} className="odd:bg-white even:bg-gray-50">
                <td className="border p-2">{i + 1}</td>
                {selectable && (
                  <td className="border p-2">
                    <input
                      type="checkbox"
                      onChange={(e) => onSelect && onSelect(f._id, e.target.checked)}
                    />
                  </td>
                )}
                <td className="border p-2">{f.name}</td>
                <td className="border p-2">{f.gender}</td>
                <td className="border p-2">{f.weight}</td>
                <td className="border p-2">{f.belt}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FighterTable;
