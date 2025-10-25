import React, { useState } from 'react';
import { 
  useFetchAllFighterQuery, 
  useAddFighterMutation 
} from '../redux/features/fighterAPI';

const Home = () => {
  const { data: fighters = [], isLoading, isError } = useFetchAllFighterQuery();
  const [addFighter] = useAddFighterMutation();

  const [formData, setFormData] = useState({
    name: '',
    weight: '',
    belt: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    const newFighter = { ...formData, month, year };

    try {
      await addFighter(newFighter).unwrap();
      setFormData({ name: '', weight: '', belt: '' });
    } catch (err) {
      console.error('Error adding fighter:', err);
    }
  };

  if (isLoading) return <p>Đang tải dữ liệu...</p>;
  if (isError) return <p>Lỗi tải danh sách võ sinh.</p>;

  return (
    <div className="flex flex-col items-center py-12">
      <h1 className="text-3xl font-bold mb-6 font-[Montserrat]">Đăng ký thi đấu</h1>

      {/* Form đăng ký */}
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

        <button 
          type="submit" 
          className="btn-primary mt-2"
        >
          Gửi đăng ký
        </button>
      </form>

      {/* Danh sách võ sinh */}
      <div className="mt-10 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4 font-[Montserrat]">Danh sách võ sinh</h2>
        <table className="w-full border-collapse border border-gray-300 text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">Tên</th>
              <th className="border p-2">Cân nặng</th>
              <th className="border p-2">Cấp đai</th>
            </tr>
          </thead>
          <tbody>
            {fighters.map((f, index) => (
              <tr key={f._id || index}>
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{f.name}</td>
                <td className="border p-2">{f.weight}</td>
                <td className="border p-2">{f.belt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
