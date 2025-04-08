import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookmarkCheck, Clock, DollarSign, Users } from 'lucide-react';
import AdminSidebar from '../../components/AdminSidebar';
import { useServices } from '../../context/ServicesContext';
import { useBookings } from '../../context/BookingsContext';

const AdminDashboard = () => {
  const { services } = useServices();
  const { bookings } = useBookings();
  const [recentBookings, setRecentBookings] = useState<typeof bookings>([]);

  useEffect(() => {
    // Sort bookings by creation date (newest first) and take the first 5
    const sorted = [...bookings].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    setRecentBookings(sorted.slice(0, 5));
  }, [bookings]);

  // Calculate stats
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
  
  // Calculate estimated revenue from confirmed bookings
  const estimatedRevenue = bookings
    .filter(b => b.status === 'confirmed')
    .reduce((total, booking) => {
      const service = services.find(s => s.id === booking.serviceId);
      return total + (service?.price || 0);
    }, 0);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard 
                title="Total Bookings" 
                value={totalBookings.toString()} 
                icon={<BookmarkCheck size={20} />}
                color="bg-blue-500"
              />
              <StatsCard 
                title="Pending Approval" 
                value={pendingBookings.toString()} 
                icon={<Clock size={20} />}
                color="bg-yellow-500"
              />
              <StatsCard 
                title="Confirmed" 
                value={confirmedBookings.toString()} 
                icon={<Users size={20} />}
                color="bg-green-500"
              />
              <StatsCard 
                title="Estimated Revenue" 
                value={`$${estimatedRevenue}`} 
                icon={<DollarSign size={20} />}
                color="bg-indigo-500"
              />
            </div>
            
            {/* Recent Bookings */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Recent Bookings</h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {recentBookings.length === 0 ? (
                  <div className="px-6 py-4 text-gray-500 text-center">
                    No bookings yet.
                  </div>
                ) : (
                  recentBookings.map((booking, index) => (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="px-6 py-4"
                    >
                      <div className="flex flex-wrap justify-between items-center">
                        <div>
                          <h3 className="text-gray-800 font-medium">{booking.name}</h3>
                          <p className="text-gray-600 text-sm">{booking.serviceName}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-600 text-sm">
                            {new Date(booking.date).toLocaleDateString()} at {booking.time}
                          </p>
                          <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
                            booking.status === 'confirmed'
                              ? 'bg-green-100 text-green-800'
                              : booking.status === 'cancelled'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
              
              {/* {recentBookings.length > 0 && (
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 text-right">
                  <a 
                    href="/admin/bookings" 
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                  >
                    View all bookings
                  </a>
                </div>
              )} */}
            </div>
            
            {/* Services Overview */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Services Overview</h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {services.length === 0 ? (
                  <div className="px-6 py-4 text-gray-500 text-center">
                    No services available.
                  </div>
                ) : (
                  services.map((service, index) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="px-6 py-4 flex items-center"
                    >
                      <div className="h-12 w-12 rounded-md overflow-hidden flex-shrink-0 mr-4">
                        <img 
                          src={service.image} 
                          alt={service.title} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-gray-800 font-medium">{service.title}</h3>
                        <p className="text-gray-600 text-sm">{service.duration} min • ${service.price}</p>
                      </div>
                      {service.featured && (
                        <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                          Featured
                        </span>
                      )}
                    </motion.div>
                  ))
                )}
              </div>
              
              {/* {services.length > 0 && (
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 text-right">
                  <a 
                    href="/admin/services" 
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                  >
                    Manage services
                  </a>
                </div>
              )} */}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

type StatsCardProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
};

const StatsCard = ({ title, value, icon, color }: StatsCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-lg shadow-md p-6"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
      </div>
      <div className={`${color} h-10 w-10 rounded-full flex items-center justify-center text-white`}>
        {icon}
      </div>
    </div>
  </motion.div>
);

export default AdminDashboard;
