import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { CheckSquare, LogOut, User, Sun, Moon, Menu, X } from 'lucide-react';

export default function Header() {
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white/70 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40 dark:bg-gray-800/70 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-2 rounded-lg shadow-sm">
              <CheckSquare className="h-6 w-6 text-white" />
            </div>
            <span className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
              TaskTracker
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center space-x-4">
            {/* Theme Toggle Switch */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={darkMode}
                onChange={toggleTheme}
                aria-label="Toggle dark mode"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-blue-600 transition-colors dark:bg-gray-600 peer-checked:dark:bg-blue-700"></div>
              <div className="absolute left-1 top-1 w-4 h-4 flex items-center justify-center pointer-events-none transition-transform duration-200
                bg-white border border-gray-300 rounded-full shadow
                peer-checked:translate-x-5 dark:bg-gray-800 dark:border-gray-600">
                {darkMode ? (
                  <Moon className="h-3.5 w-3.5 text-blue-600" />
                ) : (
                  <Sun className="h-2.0 w-2.0 text-orange-400" />
                )}
              </div>
            </label>
            <div className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
              <User className="h-4 w-4" />
              <span>{user?.email}</span>
            </div>
            <button
              onClick={logout}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Open menu"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="sm:hidden absolute top-16 left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-lg z-50">
          <div className="flex flex-col items-stretch px-6 py-4 space-y-4">
            <div className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
              <User className="h-4 w-4" />
              <span>{user?.email}</span>
            </div>
            {/* Theme Toggle */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={darkMode}
                onChange={toggleTheme}
                aria-label="Toggle dark mode"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-blue-600 transition-colors dark:bg-gray-600 peer-checked:dark:bg-blue-700"></div>
              <div className="absolute left-1 top-1 w-4 h-4 flex items-center justify-center pointer-events-none transition-transform duration-200
                bg-white border border-gray-300 rounded-full shadow
                peer-checked:translate-x-5 dark:bg-gray-800 dark:border-gray-600">
                {darkMode ? (
                  <Moon className="h-3.5 w-3.5 text-blue-600" />
                ) : (
                  <Sun className="h-2.0 w-2.0 text-orange-400" />
                )}
              </div>
              <span className="ml-4 text-sm text-gray-700 dark:text-gray-300">
                {darkMode ? 'Dark Mode' : 'Light Mode'}
              </span>
            </label>
            <button
              onClick={logout}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
