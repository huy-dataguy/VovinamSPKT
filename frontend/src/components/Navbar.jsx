import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import avatarImage from "../assets/avatar.png";
import fightday from "../assets/vvnspkt.png";
import { HiUserCircle } from "react-icons/hi2";
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
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
    <nav className="fixed top-0 left-0 w-full bg-slate-200 dark:bg-gray-900 border-gray-200 z-50">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">

        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img src={fightday} className="h-12" alt="FightDay Logo" />
          <span className="self-center text-2xl font-semibold dark:text-white">Vovinam HCMUTE</span>
        </Link>

        {/* Menu desktop */}
        <ul className="hidden md:flex space-x-8 text-gray-900 dark:text-white">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link to={item.href} className="py-2 px-3 hover:text-blue-600 dark:hover:text-blue-400">{item.name}</Link>
            </li>
          ))}
        </ul>

        {/* Avatar hoặc Login icon */}
        <div className="flex items-center">
          {isLoggedIn ? (
            <div className="relative">
              <button onClick={() => setIsDropDownOpen(!isDropDownOpen)}>
                <img src={avatarImage} alt="Avatar" className="w-10 h-10 rounded-full border border-gray-300" />
              </button>

              {isDropDownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md z-50">
                  <ul>
                    <li>
                      <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link to="/admin">
              <HiUserCircle className="w-10 h-10 text-gray-400" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
