import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import './index.css';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Booking from './pages/Booking';
import NotFound from './pages/NotFound';

// Admin pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageServices from './pages/admin/ManageServices';
import ManageBookings from './pages/admin/ManageBookings';
import ManageVideos from './pages/admin/ManageVideos';

// Context
import { ServicesProvider } from './context/ServicesContext';
import { BookingsProvider } from './context/BookingsContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  useEffect(() => {
    // Initialize local storage with demo data if not exists
    if (!localStorage.getItem('services')) {
      localStorage.setItem('services', JSON.stringify([
        {
          id: '1',
          title: 'Photography Session',
          description: 'Professional photography session in our state-of-the-art studio.',
          price: 199,
          duration: 60,
          image: 'https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?q=80&w=2000',
          featured: true
        },
        {
          id: '2',
          title: 'Video Production',
          description: 'Full video production service including editing and post-production.',
          price: 499,
          duration: 180,
          image: 'https://images.unsplash.com/photo-1579165466741-7f35e4755183?q=80&w=2000',
          featured: true
        },
        {
          id: '3',
          title: 'Recording Session',
          description: 'Professional audio recording session with sound engineer.',
          price: 299,
          duration: 120,
          image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2000',
          featured: false
        }
      ]));
    }

    if (!localStorage.getItem('bookings')) {
      localStorage.setItem('bookings', JSON.stringify([]));
    }

    if (!localStorage.getItem('videos')) {
      localStorage.setItem('videos', JSON.stringify([
        {
          id: '1',
          title: 'Studio Tour',
          youtubeId: 'dQw4w9WgXcQ',
          description: 'Take a tour of our professional studio space and equipment.'
        },
        {
          id: '2',
          title: 'Client Testimonials',
          youtubeId: 'dQw4w9WgXcQ',
          description: 'Hear what our clients have to say about our services.'
        }
      ]));
    }

    // Add admin credentials if not exists
    if (!localStorage.getItem('admin')) {
      localStorage.setItem('admin', JSON.stringify({
        username: 'admin',
        password: 'admin123'
      }));
    }

    // Add Google Font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      // Clean up
    };
  }, []);

  return (
    <AuthProvider>
      <ServicesProvider>
        <BookingsProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 font-[Poppins]">
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/about" element={<About />} />
                <Route path="/booking" element={<Booking />} />
                
                {/* Admin routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/admin/services" element={
                  <ProtectedRoute>
                    <ManageServices />
                  </ProtectedRoute>
                } />
                <Route path="/admin/bookings" element={
                  <ProtectedRoute>
                    <ManageBookings />
                  </ProtectedRoute>
                } />
                <Route path="/admin/videos" element={
                  <ProtectedRoute>
                    <ManageVideos />
                  </ProtectedRoute>
                } />
                
                {/* 404 route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster position="bottom-center" />
            </div>
          </Router>
        </BookingsProvider>
      </ServicesProvider>
    </AuthProvider>
  );
}

export default App;
