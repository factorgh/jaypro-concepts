import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useServices } from '../context/ServicesContext';
import { useBookings } from '../context/BookingsContext';
import { CalendarClock, Info } from 'lucide-react';

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { services } = useServices();
  const { addBooking } = useBookings();
  
  // Initial service selection from navigation state (if available)
  const initialServiceId = location.state?.serviceId || '';
  
  // Form state
  const [serviceId, setServiceId] = useState(initialServiceId);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  // Get selected service
  const selectedService = services.find(service => service.id === serviceId);

  // Generate available dates (next 30 days)
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 30; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    
    return dates;
  };

  // Generate available time slots
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      slots.push(`${hour}:00`);
      if (hour < 17) {
        slots.push(`${hour}:30`);
      }
    }
    return slots;
  };

  const availableDates = generateAvailableDates();
  const timeSlots = generateTimeSlots();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!serviceId || !date || !time || !name || !email || !phone) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setLoading(true);
    
    // Create booking object
    const newBooking = {
      serviceId,
      serviceName: selectedService?.title || '',
      date,
      time,
      name,
      email,
      phone
    };
    
    // Add some delay to simulate API call
    setTimeout(() => {
      addBooking(newBooking);
      setLoading(false);
      toast.success('Booking submitted successfully!');
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Page Header */}
      <section className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Book Your Studio Session
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto text-gray-300"
          >
            Complete the form below to book your preferred service. Our team will confirm your booking.
          </motion.p>
        </div>
      </section>
      
      {/* Booking Form */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-indigo-600 text-white p-6 flex items-center">
              <CalendarClock size={24} className="mr-2" />
              <h2 className="text-xl font-semibold">Booking Details</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              {/* Service Selection */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="service">
                  Select Service *
                </label>
                <select
                  id="service"
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">-- Select a Service --</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.title} - ${service.price}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="date">
                    Date *
                  </label>
                  <select
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  >
                    <option value="">-- Select a Date --</option>
                    {availableDates.map((date) => (
                      <option key={date} value={date}>
                        {new Date(date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="time">
                    Time *
                  </label>
                  <select
                    id="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  >
                    <option value="">-- Select a Time --</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              {/* Personal Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>
              </div>
              
              {/* Service Summary - only show if a service is selected */}
              {selectedService && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="mb-6 p-4 bg-indigo-50 rounded-md border border-indigo-100"
                >
                  <div className="flex items-start">
                    <Info size={20} className="text-indigo-600 mr-2 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-md font-semibold text-indigo-800 mb-2">Service Summary</h4>
                      <p className="text-gray-700 mb-1">
                        <span className="font-medium">Service:</span> {selectedService.title}
                      </p>
                      <p className="text-gray-700 mb-1">
                        <span className="font-medium">Duration:</span> {selectedService.duration} minutes
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Price:</span> ${selectedService.price}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Submit Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-indigo-600 text-white p-3 rounded-md font-medium transition-colors duration-300 ${
                    loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-indigo-700'
                  }`}
                >
                  {loading ? 'Processing...' : 'Submit Booking'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Booking;
