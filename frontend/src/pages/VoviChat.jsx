import React from 'react';
import { Link } from 'react-router-dom';
import { FaTools } from "react-icons/fa";

const Coach = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 text-center px-4">
      
      {/* Icon + Tiêu đề */}
      <div className="flex flex-col items-center space-y-4">
        <FaTools className="text-blue-600 text-6xl animate-bounce" />
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          This feature is <span className="text-blue-600">coming soon</span> 🚀
        </h1>
        <p className="text-gray-600 max-w-md leading-relaxed">
          Chúng mình đang phát triển thêm nhiều tính năng mới cho website CLB VovinamSPKT!  
          Nếu bạn yêu thích công nghệ, thiết kế, hay chỉ đơn giản là muốn đóng góp ý tưởng - 
          <span className="font-semibold text-blue-600"> Don’t think — just do it!</span>💪
        </p>
      </div>

      {/* Nút Join */}
      <div className="mt-8">
        <a
          href="https://github.com/huy-dataguy/VovinamSPKT"
          target="_blank"
          rel="noopener noreferrer"
          className="relative overflow-hidden px-8 py-3 rounded-full font-semibold text-white shadow-lg hover:scale-105 transition-transform duration-300"
        >
          <span className="relative z-10">Contribute Now</span>
          {/* Gradient động */}
          <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 animate-gradientMove"></span>
          {/* Lấp lánh nhẹ */}
          <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.3),transparent_60%)] mix-blend-overlay animate-shimmer"></span>
        </a>
      </div>

      {/* Gợi ý khác */}
      <p className="mt-10 text-sm text-gray-500">
        Trong khi chờ đợi, bạn có thể khám phá thêm các mục khác như{' '}
        <Link to="/fighters" className="text-blue-600 hover:underline">Fighters</Link>{' '}
        hoặc{' '}
        <Link to="/matches" className="text-blue-600 hover:underline">Matches</Link>{' '}
        nhé 💙
      </p>
    </div>
  );
};

export default Coach;
