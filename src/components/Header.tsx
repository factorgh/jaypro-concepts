import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, Shield, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <motion.div 
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-2xl font-bold text-indigo-600">JayPro </span>
            <span className='text-2xl font-bold text-gray-500'>Concept</span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" isActive={isActive('/')}>Home</NavLink>
          <NavLink to="/services" isActive={isActive('/services')}>Services</NavLink>
          <NavLink to="/about" isActive={isActive('/about')}>About Us</NavLink>
          <NavLink to="/booking" isActive={isActive('/booking')}>Book Now</NavLink>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/admin/login" 
              className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition-colors"
              title="Admin Login"
            >
              <Shield size={18} className="text-gray-700" />
            </Link>
          </motion.div>
        </nav>

        {/* Mobile Menu Button and Admin Button */}
        <div className="md:hidden flex items-center space-x-4">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/admin/login" 
              className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition-colors"
              title="Admin Login"
            >
              <Shield size={18} className="text-gray-700" />
            </Link>
          </motion.div>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="text-gray-700"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-white px-4 py-2 shadow-md"
        >
          <nav className="flex flex-col space-y-3 py-3">
            <MobileNavLink 
              to="/" 
              isActive={isActive('/')}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </MobileNavLink>
            <MobileNavLink 
              to="/services" 
              isActive={isActive('/services')}
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </MobileNavLink>
            <MobileNavLink 
              to="/about" 
              isActive={isActive('/about')}
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </MobileNavLink>
            <MobileNavLink 
              to="/booking" 
              isActive={isActive('/booking')}
              onClick={() => setIsMenuOpen(false)}
            >
              Book Now
            </MobileNavLink>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

type NavLinkProps = {
  to: string;
  children: React.ReactNode;
  isActive: boolean;
};

const NavLink = ({ to, children, isActive }: NavLinkProps) => (
  <Link
    to={to}
    className={`font-medium transition-colors duration-300 ${
      isActive 
        ? 'text-indigo-600 border-b-2 border-indigo-600' 
        : 'text-gray-700 hover:text-indigo-600'
    }`}
  >
    {children}
  </Link>
);

type MobileNavLinkProps = NavLinkProps & {
  onClick: () => void;
};

const MobileNavLink = ({ to, children, isActive, onClick }: MobileNavLinkProps) => (
  <Link
    to={to}
    onClick={onClick}
    className={`block px-3 py-2 rounded-md ${
      isActive 
        ? 'bg-indigo-50 text-indigo-600 font-medium' 
        : 'text-gray-700 hover:bg-gray-100'
    }`}
  >
    {children}
  </Link>
);

export default Header;
