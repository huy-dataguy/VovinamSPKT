import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import avatarImage from "../assets/avatar.png";
import fightday from "../assets/vvnspkt.png";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const currentUser = true;

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'VoviChat', href: '/vovichat' },
  ];

  const profile = [
    { name: "Profile", href: "/profile" },
    { name: "Log out", href: "/logout" }
  ];

  const handleLinkClick = () => {
    setIsDropDownOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-slate-200 dark:bg-gray-900 border-gray-200">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
        {/* Left side: Logo + Mobile menu button */}
        <div className="flex items-center space-x-2">
          {/* Mobile toggle (hamburger) - now on the LEFT */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={fightday} className="h-12" alt="FightDay Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              FightDay
            </span>
          </Link>
        </div>

        {/* Center: Navigation (desktop only) */}
        <ul className="hidden md:flex md:space-x-8 text-gray-900 dark:text-white">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                onClick={handleLinkClick}
                className="py-2 px-3 hover:text-blue-600 dark:hover:text-blue-400"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side: Avatar */}
        <div className="flex items-center">
          {currentUser && (
            <div className="relative">
              <button onClick={() => setIsDropDownOpen(!isDropDownOpen)}>
                <img
                  src={avatarImage}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full border border-gray-300"
                />
              </button>

              {isDropDownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md z-50">
                  <ul>
                    {profile.map((item) => (
                      <li key={item.name} onClick={handleLinkClick}>
                        <Link
                          to={item.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-300 dark:border-gray-700">
          <ul className="flex flex-col items-center py-2 bg-slate-200 dark:bg-gray-900">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  onClick={handleLinkClick}
                  className="block py-2 px-3 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
