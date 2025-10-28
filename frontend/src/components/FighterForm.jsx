import React, { useState } from 'react';
import { useAddFighterMutation } from '../redux/features/fighterAPI';

const FighterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    weight: '',
    belt: '',
  });

  const [addFighter, { isLoading }] = useAddFighterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    // chuyển weight về number
    const payload = { 
      ...formData, 
      weight: Number(formData.weight),
      month,
      year
    };

    try {
      await addFighter(payload).unwrap();
      setFormData({ name: '', gender: '', weight: '', belt: '' });
    } catch (err) {
      console.error('Lỗi thêm võ sinh:', err);
      alert('Thêm không thành công. Kiểm tra console để biết chi tiết.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className="text-sm">Tên võ sinh</label>
      <input
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
        className="border p-2 rounded-md"
        placeholder="Nhập họ tên"
      />

      <label className="text-sm">Giới tính</label>
      <select
        value={formData.gender}
        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
        required
        className="border p-2 rounded-md"
      >
        <option value="">Chọn giới tính</option>
        <option value="Nam">Nam</option>
        <option value="Nữ">Nữ</option>
      </select>

      <label className="text-sm">Cân nặng (kg)</label>
      <input
        type="number"
        value={formData.weight}
        onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
        required
        min="0"
        className="border p-2 rounded-md"
        placeholder="Ví dụ: 65"
      />

      <label className="text-sm">Cấp đai</label>
      <select
        value={formData.belt}
        onChange={(e) => setFormData({ ...formData, belt: e.target.value })}
        required
        className="border p-2 rounded-md"
      >
        <option value="">Chọn cấp đai</option>
        <option value="Tự Vệ">Tự vệ</option>
        <option value="Lam đai">Lam đai</option>
        <option value="Lam đai I">Lam đai I</option>
        <option value="Lam đai II">Lam đai II</option>
        <option value="Lam đai III">Lam đai III</option>
        <option value="Hoàng đai">Hoàng đai</option>
        <option value="Hoàng đai I">Hoàng đai I</option>
        <option value="Hoàng đai II">Hoàng đai II</option>
        <option value="Hoàng đai III">Hoàng đai III</option>
      </select>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60"
      >
        {isLoading ? 'Đang gửi...' : 'Gửi đăng ký'}
      </button>
    </form>
  );
};

export default FighterForm;
