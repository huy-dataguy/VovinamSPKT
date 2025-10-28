import React, { useState } from 'react';
import { useAddFighterMutation } from '../redux/features/fighterAPI';

const FighterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    weight: '',
    belt: '',
    club: 'HCMUTE',
    birthYear: '',
  });

  const [addFighter, { isLoading }] = useAddFighterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Nếu club rỗng, mặc định HCMUTE
    const payload = {
      ...formData,
      weight: Number(formData.weight),
      club: formData.club || 'HCMUTE',
      birthYear: formData.birthYear ? Number(formData.birthYear) : undefined,
    };

    try {
      await addFighter(payload).unwrap();
      setFormData({
        name: '',
        gender: '',
        weight: '',
        belt: '',
        club: 'VovinamSPKT',
        birthYear: '',
      });
      alert('Thêm võ sinh thành công!');
    } catch (err) {
      console.error('Lỗi thêm võ sinh:', err);
      alert('Thêm không thành công. Kiểm tra console để biết chi tiết.');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-lg w-full max-w-md"
    >
      <input 
        type="text" 
        placeholder="Tên võ sinh" 
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        className="border p-2 rounded-md w-full"
        required
      />

      <select 
        value={formData.gender}
        onChange={(e) => setFormData({...formData, gender: e.target.value})}
        className="border p-2 rounded-md w-full"
        required
      >
        <option value="">Giới tính</option>
        <option value="Nam">Nam</option>
        <option value="Nữ">Nữ</option>
      </select>

      <input 
        type="number" 
        placeholder="Cân nặng (kg)" 
        value={formData.weight}
        onChange={(e) => setFormData({...formData, weight: e.target.value})}
        className="border p-2 rounded-md w-full"
        required
      />

      <select 
        value={formData.belt}
        onChange={(e) => setFormData({...formData, belt: e.target.value})}
        className="border p-2 rounded-md w-full"
        required
      >
        <option value="">Cấp đai hiện tại</option>
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
{/* 
      <input
        type="text"
        placeholder="Câu lạc bộ"
        value={formData.club}
        onChange={(e) => setFormData({ ...formData, club: e.target.value })}
        className="border p-2 rounded-md w-full"
      /> */}

      <input
        type="number"
        placeholder="Năm sinh"
        value={formData.birthYear}
        onChange={(e) => setFormData({ ...formData, birthYear: e.target.value })}
        className="border p-2 rounded-md w-full"
      />

      <button 
        type="submit" 
        className="btn-primary mt-2"
        disabled={isLoading}
      >
        {isLoading ? 'Đang gửi...' : 'Gửi đăng ký'}
      </button>
    </form>
  );
};

export default FighterForm;
