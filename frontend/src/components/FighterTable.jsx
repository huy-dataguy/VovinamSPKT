import React, { useState, useEffect } from 'react';
import { useDeleteFighterMutation, useUpdateFighterMutation } from '../redux/features/fighterAPI';

const FighterTable = ({ fighters = [], selectable = false, onPairSelected, resetTrigger }) => {
  const [selected, setSelected] = useState({ fighter1: null, fighter2: null });
  const [editFighter, setEditFighter] = useState(null);
  const [formData, setFormData] = useState({ name: '', gender: '', weight: '', belt: '', club: '', birthYear: '' });
  const [genderFilter, setGenderFilter] = useState('All'); // All / Nam / Nữ

  const [deleteFighter] = useDeleteFighterMutation();
  const [updateFighter] = useUpdateFighterMutation();

  const handleSelect = (id) => {
    if (!selectable) return;
    if (selected.fighter1 === id) setSelected(prev => ({ ...prev, fighter1: null }));
    else if (selected.fighter2 === id) setSelected(prev => ({ ...prev, fighter2: null }));
    else {
      if (!selected.fighter1) setSelected(prev => ({ ...prev, fighter1: id }));
      else if (!selected.fighter2) setSelected(prev => ({ ...prev, fighter2: id }));
      else alert('Chỉ được chọn tối đa 2 võ sinh.');
    }
  };

  useEffect(() => {
    onPairSelected && onPairSelected(
      selected.fighter1 && selected.fighter2 ? [selected.fighter1, selected.fighter2] : []
    );
  }, [selected, onPairSelected]);

  useEffect(() => setSelected({ fighter1: null, fighter2: null }), [resetTrigger]);

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa võ sinh này?')) {
      try {
        await deleteFighter(id).unwrap();
        alert('Xóa thành công!');
      } catch (err) {
        console.error(err);
        alert('Xóa thất bại!');
      }
    }
  };

  const handleEdit = (fighter) => {
    setEditFighter(fighter);
    setFormData({
      name: fighter.name,
      gender: fighter.gender,
      weight: fighter.weight,
      belt: fighter.belt,
      club: fighter.club || '',
      birthYear: fighter.birthYear || '',
    });
  };

  const handleSave = async () => {
    try {
      await updateFighter({ id: editFighter._id, ...formData }).unwrap();
      alert('Cập nhật thành công!');
      setEditFighter(null);
    } catch (err) {
      console.error(err);
      alert('Cập nhật thất bại!');
    }
  };

  // Lọc và sắp xếp
  const filteredFighters = fighters
    .filter(f => genderFilter === 'All' || f.gender === genderFilter)
    .sort((a, b) => a.weight - b.weight);

  return (
    <div>
      {/* Filter */}
      <div className="mb-4 flex gap-4 items-center">
        <label className="font-semibold">Bộ lọc</label>
        <select
          className="border p-1 rounded"
          value={genderFilter}
          onChange={e => setGenderFilter(e.target.value)}
        >
          <option value="All">Tất cả</option>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
        </select>
      </div>

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
              <th className="border p-2">Cập nhật</th>
              <th className="border p-2">Xóa</th>
            </tr>
          </thead>
          <tbody>
            {filteredFighters.length === 0 ? (
              <tr>
                <td colSpan={selectable ? 8 : 7} className="p-4">Chưa có võ sinh</td>
              </tr>
            ) : filteredFighters.map((f, i) => (
              <tr
                key={f._id || i}
                className={`odd:bg-white even:bg-gray-50 
                  ${selected.fighter1 === f._id ? 'bg-orange-200' : ''}
                  ${selected.fighter2 === f._id ? 'bg-blue-200' : ''}`}
              >
                <td className="border p-2">{i + 1}</td>
                {selectable && (
                  <td className="border p-2">
                    <input
                      type="checkbox"
                      checked={selected.fighter1 === f._id || selected.fighter2 === f._id}
                      onChange={() => handleSelect(f._id)}
                    />
                  </td>
                )}
                <td className="border p-2">{f.name}</td>
                <td className="border p-2">{f.gender}</td>
                <td className="border p-2">{f.weight}</td>
                <td className="border p-2">{f.belt}</td>
                <td className="border p-2">
                  <button className="bg-yellow-400 px-2 py-1 rounded" onClick={() => handleEdit(f)}>Cập nhật</button>
                </td>
                <td className="border p-2">
                  <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(f._id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal chỉnh sửa */}
      {editFighter && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Cập nhật võ sinh</h2>
            <input className="w-full mb-2 border p-1" placeholder="Tên" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
            <input className="w-full mb-2 border p-1" placeholder="Giới tính" value={formData.gender} onChange={e => setFormData({ ...formData, gender: e.target.value })} />
            <input className="w-full mb-2 border p-1" placeholder="Cân nặng" type="number" value={formData.weight} onChange={e => setFormData({ ...formData, weight: e.target.value })} />
            <input className="w-full mb-2 border p-1" placeholder="Cấp đai" value={formData.belt} onChange={e => setFormData({ ...formData, belt: e.target.value })} />
            <input className="w-full mb-2 border p-1" placeholder="Câu lạc bộ" value={formData.club} onChange={e => setFormData({ ...formData, club: e.target.value })} />
            <input className="w-full mb-4 border p-1" placeholder="Năm sinh" type="number" value={formData.birthYear} onChange={e => setFormData({ ...formData, birthYear: e.target.value })} />
            <div className="flex justify-end gap-2">
              <button className="bg-gray-300 px-3 py-1 rounded" onClick={() => setEditFighter(null)}>Hủy</button>
              <button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={handleSave}>Lưu</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FighterTable;
