import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import logo from './figma/logo.png'
interface NavbarProps {
  onJoinWaitlist: () => void;
  onNavigateToLeaderboard: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onJoinWaitlist, onNavigateToLeaderboard }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { label: 'Home', href: '#' },
    { label: 'Features', href: '#features' },
    // { label: 'Community', href: '#' },
    // { label: 'Docs', href: '#' },
    // { label: 'Blog', href: '#' },
    { label: 'Leaderboard', href: '#', onClick: onNavigateToLeaderboard }
  ];

  return (
    <nav className="bg-black/90 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full"><img src={logo} alt="" srcset=""   className="w-8 h-8 rounded-full"/></div>
            <span className="text-white text-xl font-medium">LearnFi</span>
          </div>
              
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={item.onClick}
                className="text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop Join Waitlist Button */}
          <div className="hidden md:block">
            <Button 
              onClick={onJoinWaitlist}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
            >
              Join Waitlist
            </Button>
          </div>

          {/* Mobile hamburger menu */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-800 mt-2 pt-4 pb-4"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={item.onClick}
                  className="text-gray-300 hover:text-white transition-colors block px-2 py-1"
                >
                  {item.label}
                </a>
              ))}
              <Button 
                onClick={onJoinWaitlist}
                className="bg-blue-600 hover:bg-blue-700 text-white w-full mt-4"
              >
                Join Waitlist
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};