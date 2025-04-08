import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Service } from '../context/ServicesContext';
import { Clock, DollarSign } from 'lucide-react';

type ServiceCardProps = {
  service: Service;
  index: number;
};

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
        <p className="text-gray-600 mb-4">{service.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-gray-700">
            <Clock size={16} className="mr-1" />
            <span>{service.duration} min</span>
          </div>
          <div className="flex items-center text-gray-700">
            <DollarSign size={16} className="mr-1" />
            <span>${service.price}</span>
          </div>
        </div>
        
        <Link to="/booking" state={{ serviceId: service.id }}>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300"
          >
            Book Now
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
