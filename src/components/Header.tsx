import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { LanguageSwitcher } from './LanguageSwitcher';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onPageChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const navigation = [
    { name: 'Home', key: 'home' },
    { name: 'About Us', key: 'about' },
    { name: 'Services', key: 'services' },
    { name: 'Investment Plans', key: 'investment' },
    { name: 'Contact', key: 'contact' },
  ];

  const handleNavClick = (key: string) => {
    onPageChange(key);
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    onPageChange('home');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-xl">NF</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">NF Plantation</h1>
              <p className="text-sm text-gray-600">Investment Solutions</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.key)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === item.key
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-600">
                  Welcome, <span className="font-medium text-gray-900">{user.user_metadata?.name || user.email}</span>
                  {user.user_metadata?.role === 'admin' && (
                    <span className="ml-1 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Admin</span>
                  )}
                </div>
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Dashboard
                </button>
                {user.user_metadata?.role === 'admin' && (
                  <button
                    onClick={() => handleNavClick('admin')}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Admin Panel
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-gray-600 text-white px-3 py-2 rounded-md hover:bg-gray-700 transition-colors text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleNavClick('login')}
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNavClick('register')}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  Register
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-green-600 p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.key)}
                  className={`text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    currentPage === item.key
                      ? 'text-green-600 bg-green-50'
                      : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              
              {user ? (
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleNavClick('dashboard')}
                    className="text-left px-3 py-2 text-green-600 hover:text-green-700 font-medium"
                  >
                    Dashboard
                  </button>
                  {user.user_metadata?.role === 'admin' && (
                    <button
                      onClick={() => handleNavClick('admin')}
                      className="text-left px-3 py-2 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Admin
                    </button>
                  )}
                  <button
                    onClick={handleLogout}
                    className="text-left px-3 py-2 text-gray-600 hover:text-gray-700 font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleNavClick('login')}
                    className="text-left px-3 py-2 text-green-600 hover:text-green-700 font-medium"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleNavClick('register')}
                    className="text-left px-3 py-2 text-green-600 hover:text-green-700 font-medium"
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};