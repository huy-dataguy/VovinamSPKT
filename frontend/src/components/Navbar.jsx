import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import avatarImage from "../assets/avatar.png";
import fightday from "../assets/vvnspkt.webp";
import { HiUserCircle} from "react-icons/hi2";
import { FaOutdent } from "react-icons/fa6";
import { TiThMenuOutline } from "react-icons/ti";

import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    // { name: 'Home', href: '/' },
    { name: 'Fighters', href: '/fighters' },
    { name: 'Matches', href: '/matches' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'VoviChat', href: '/vovichat' },
  ];

  const handleLogout = () => {
    logout();
    setIsDropDownOpen(false);
    navigate('/fighters');
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-[length:200%_200%] animate-gradient border-b border-blue-300/30 shadow-lg backdrop-blur-md">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4 text-white">
        
        {/* Logo */}
        <Link to="/fighters" className="flex items-center space-x-3 group">
          <img
            src={fightday}
            className="h-12 transition-transform duration-300 group-hover:scale-110"
            alt="FightDay Logo"
          />
          <span className="text-2xl font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-white animate-pulse">
            Vovinam HCMUTE
          </span>
        </Link>

        {/* Nút menu mobile */}
        <button
          className="md:hidden text-yellow-300 hover:text-white transition"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <FaOutdent size={28} />
          ) : (
            <TiThMenuOutline size={28} />
          )}
        </button>

        {/* Menu desktop */}
        <ul className="hidden md:flex space-x-8 font-medium">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                className="relative py-2 px-3 transition duration-300 group"
              >
                <span className="group-hover:text-yellow-300">{item.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Avatar hoặc Login icon */}
        <div className="hidden md:flex items-center">
          {isLoggedIn ? (
            <div className="relative">
              <button onClick={() => setIsDropDownOpen(!isDropDownOpen)}>
                <img
                  src={avatarImage}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full border-2 border-yellow-300 shadow-lg hover:scale-105 transition-transform duration-300"
                />
              </button>

              {isDropDownOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white text-gray-700 rounded-lg shadow-xl overflow-hidden animate-fadeIn">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/admin" className="group">
              <HiUserCircle className="w-10 h-10 text-yellow-300 hover:text-white transition-colors duration-300" />
            </Link>
          )}
        </div>
      </div>

      {/* Menu mobile (dropdown) */}
      {isMobileMenuOpen && (
  <div className="md:hidden bg-gradient-to-b from-indigo-500/70 via-purple-500/50 to-transparent backdrop-blur-md border-t border-indigo-300/30 animate-fadeIn shadow-lg">
    <ul className="flex flex-col space-y-2 p-4">
      {navigation.map((item) => (
        <li key={item.name}>
          <Link
            to={item.href}
            className="block py-2 px-3 text-white/90 hover:text-yellow-200 transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {item.name}
          </Link>
        </li>
      ))}

      <li className="pt-3 border-t border-indigo-300/30">
        {isLoggedIn ? (
          <button
            onClick={() => {
              handleLogout();
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 text-red-300 hover:text-red-400 transition"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/admin"
            className="block py-2 px-3 text-yellow-300 hover:text-white transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Login
          </Link>
        )}
      </li>
    </ul>
  </div>
)}

    </nav>
  );
};

export default Navbar;
