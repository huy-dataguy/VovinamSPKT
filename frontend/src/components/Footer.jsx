import React from 'react';
import { FaFacebook, FaTiktok, FaYoutube, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-5 px-6 border-t border-gray-800">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* LEFT - Social icons */}
        <div className="flex gap-6">
          <a 
            href="https://www.facebook.com/vovinamspkt"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            <FaFacebook size={24} />
          </a>
          <a 
            href="https://www.tiktok.com/@vovinamspkt"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors"
          >
            <FaTiktok size={24} />
          </a>
          <a 
            href="https://www.youtube.com/channel/UC0Et8x2mOmrq_8nNk43nrzA"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-500 transition-colors"
          >
            <FaYoutube size={24} />
          </a>
        </div>

        {/* CENTER - GitHub Contributor */}
        <a
          href="https://github.com/huy-dataguy/VovinamSPKT"  
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all duration-200"
        >
          <FaGithub size={20} />
          <span>Contributor</span>
        </a>

        {/* RIGHT - Form đăng ký (giữ màu gradient đẹp) */}
      <a
        href="https://forms.gle/h62RE61j1x9UKGp96"
        target="_blank"
        rel="noopener noreferrer"
        className="relative overflow-hidden px-6 py-2 rounded-full font-semibold text-white shadow-lg hover:scale-105 transition-transform duration-300"
      >
        <span className="relative z-10">Join Club Here</span>
        {/* Gradient động */}
        <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradientMove"></span>
        {/* Hiệu ứng lấp lánh */}
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.3),transparent_60%)] mix-blend-overlay animate-shimmer"></span>
      </a>

      </div>

      {/* Bottom text */}
      <div className="text-center text-sm text-gray-500 mt-4">
        © 2025 Vovinam HCMUTE. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
