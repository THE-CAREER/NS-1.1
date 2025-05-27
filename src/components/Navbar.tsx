import React, { useState } from 'react';
import { Shield, Menu, X, Bell, Moon, Sun, Search } from 'lucide-react';
import Button from './ui/Button';

interface NavbarProps {
  onChangePage: (page: 'dashboard' | 'report' | 'cases') => void;
  currentPage: string;
}

const Navbar = ({ onChangePage, currentPage }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };
  
  return (
    <nav className="bg-gradient-to-r from-primary-900 to-primary-800 shadow-lg border-b border-primary-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Shield className="h-8 w-8 text-accent-400 animate-pulse-slow" />
              <span className="ml-2 text-xl font-bold text-white font-display">Nirbhaya Sentinel</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <button
                onClick={() => onChangePage('dashboard')}
                className={`${
                  currentPage === 'dashboard'
                    ? 'border-accent-400 text-white'
                    : 'border-transparent text-primary-100 hover:text-white hover:border-primary-300'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}
              >
                Sentinel Dashboard
              </button>
              <button
                onClick={() => onChangePage('cases')}
                className={`${
                  currentPage === 'cases'
                    ? 'border-accent-400 text-white'
                    : 'border-transparent text-primary-100 hover:text-white hover:border-primary-300'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}
              >
                Active Cases
              </button>
              <button
                onClick={() => onChangePage('report')}
                className={`${
                  currentPage === 'report'
                    ? 'border-accent-400 text-white'
                    : 'border-transparent text-primary-100 hover:text-white hover:border-primary-300'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}
              >
                Submit Report
              </button>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="relative mr-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-primary-300" />
              </div>
              <input
                type="text"
                placeholder="Search cases..."
                className="pl-10 pr-4 py-2 border border-primary-600 rounded-md bg-primary-800/50 text-white placeholder-primary-300 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-accent-400 text-sm w-64 transition-all duration-200"
              />
            </div>
            
            <button className="p-1 rounded-full text-primary-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-400 transition-colors duration-200">
              <Bell className="h-6 w-6" />
            </button>
            
            <button 
              onClick={toggleDarkMode}
              className="ml-3 p-1 rounded-full text-primary-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-400 transition-colors duration-200"
            >
              {isDarkMode ? (
                <Sun className="h-6 w-6" />
              ) : (
                <Moon className="h-6 w-6" />
              )}
            </button>
            
            <div className="ml-3 relative">
              <div>
                <button className="bg-primary-700 rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-400">
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-accent-500 text-primary-900 flex items-center justify-center">
                    <span className="font-medium text-sm">JS</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-primary-200 hover:text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent-400"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden bg-primary-800">
          <div className="pt-2 pb-3 space-y-1">
            {['dashboard', 'cases', 'report'].map((page) => (
              <button
                key={page}
                onClick={() => {
                  onChangePage(page as 'dashboard' | 'cases' | 'report');
                  setIsOpen(false);
                }}
                className={`${
                  currentPage === page
                    ? 'bg-primary-700 border-accent-400 text-white'
                    : 'border-transparent text-primary-100 hover:bg-primary-700 hover:text-white'
                } block pl-3 pr-4 py-2 border-l-4 text-base font-medium w-full text-left transition-colors duration-200`}
              >
                {page.charAt(0).toUpperCase() + page.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="pt-4 pb-3 border-t border-primary-700">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-accent-500 text-primary-900 flex items-center justify-center">
                  <span className="font-medium">JS</span>
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-white">John Smith</div>
                <div className="text-sm font-medium text-primary-300">analyst@ngo.org</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;