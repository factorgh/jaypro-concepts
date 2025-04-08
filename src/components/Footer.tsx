import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Studio Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">JayPro Concept</h3>
            <p className="mb-4 text-gray-400">
              Professional creative services for all your photography, videography, and audio needs.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="#" icon={<Instagram size={18} />} />
              <SocialLink href="#" icon={<Twitter size={18} />} />
              <SocialLink href="#" icon={<Facebook size={18} />} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/services">Services</FooterLink>
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/booking">Book Now</FooterLink>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-400 hover:text-white transition-colors">Photography</li>
              <li className="text-gray-400 hover:text-white transition-colors">Video Production</li>
              <li className="text-gray-400 hover:text-white transition-colors">Audio Recording</li>
              <li className="text-gray-400 hover:text-white transition-colors">Studio Rental</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="flex-shrink-0 text-indigo-400" />
                <span className="text-gray-400">Dansoman Sharp Curve</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="flex-shrink-0 text-indigo-400" />
                <span className="text-gray-400">(233) 55-826-2013</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="flex-shrink-0 text-indigo-400" />
                <span className="text-gray-400">contact@jaypro.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} JayPro Concept. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

type SocialLinkProps = {
  href: string;
  icon: React.ReactNode;
};

const SocialLink = ({ href, icon }: SocialLinkProps) => (
  <a 
    href={href} 
    className="bg-gray-800 hover:bg-indigo-600 p-2 rounded-full transition-colors duration-300"
  >
    {icon}
  </a>
);

type FooterLinkProps = {
  to: string;
  children: React.ReactNode;
};

const FooterLink = ({ to, children }: FooterLinkProps) => (
  <li>
    <Link to={to} className="text-gray-400 hover:text-white transition-colors">
      {children}
    </Link>
  </li>
);

export default Footer;
