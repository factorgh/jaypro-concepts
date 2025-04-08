import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Box, Calendar, Film, LayoutDashboard, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminSidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 text-white w-64 min-h-screen flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <Link to="/admin" className="flex items-center justify-center space-x-2">
          <span className="text-xl font-bold">JayPro Admin</span>
        </Link>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <NavItem 
            to="/admin" 
            icon={<LayoutDashboard size={20} />} 
            isActive={isActive('/admin')}
          >
            Dashboard
          </NavItem>
          <NavItem 
            to="/admin/bookings" 
            icon={<Calendar size={20} />} 
            isActive={isActive('/admin/bookings')}
          >
            Bookings
          </NavItem>
          <NavItem 
            to="/admin/services" 
            icon={<Box size={20} />} 
            isActive={isActive('/admin/services')}
          >
            Services
          </NavItem>
          <NavItem 
            to="/admin/videos" 
            icon={<Film size={20} />} 
            isActive={isActive('/admin/videos')}
          >
            Videos
          </NavItem>
        </ul>
      </nav>
      
      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 text-gray-300 hover:text-white w-full"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </motion.div>
  );
};

type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  isActive: boolean;
  children: React.ReactNode;
};

const NavItem = ({ to, icon, isActive, children }: NavItemProps) => (
  <li>
    <Link
      to={to}
      className={`flex items-center space-x-3 p-3 rounded-md transition-colors ${
        isActive 
          ? 'bg-indigo-600 text-white' 
          : 'text-gray-300 hover:bg-gray-700'
      }`}
    >
      {icon}
      <span>{children}</span>
    </Link>
  </li>
);

export default AdminSidebar;
