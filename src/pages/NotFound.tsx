import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <section className="flex-grow flex items-center justify-center py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-lg mx-auto"
          >
            <div className="mb-8">
              <motion.div 
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ 
                  duration: 0.7,
                  ease: "easeInOut"
                }}
                className="text-9xl font-bold text-indigo-600"
              >
                404
              </motion.div>
              <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">Page Not Found</h1>
              <p className="text-gray-600">
                The page you are looking for doesn't exist or has been moved.
              </p>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link 
                to="/" 
                className="inline-flex items-center space-x-2 text-white bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-md font-medium transition-colors"
              >
                <ArrowLeft size={18} />
                <span>Back to Home</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default NotFound;
