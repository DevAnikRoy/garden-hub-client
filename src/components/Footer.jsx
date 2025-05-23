import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaPinterest, FaYoutube } from 'react-icons/fa';
import logo from '../assets/images/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-12 border-t dark:border-gray-700">
      <div className="container mx-auto px-4">
        {/* Footer Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <img src={logo} alt="Garden Hub Logo" className="h-10 w-auto mr-2" />
              <h3 className="text-xl font-bold text-primary-500 dark:text-primary-400">GardenHub</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              A community platform for garden enthusiasts to share knowledge, find local gardeners, and grow together.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition">
                <FaFacebook className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition">
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition">
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition">
                <FaPinterest className="h-6 w-6" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition">
                <FaYoutube className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-gray-800 dark:text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/browse-tips" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition">
                  Browse Tips
                </Link>
              </li>
              <li>
                <Link to="/explore-gardeners" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition">
                  Explore Gardeners
                </Link>
              </li>
              <li>
                <Link to="/share-tip" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition">
                  Share a Garden Tip
                </Link>
              </li>
            </ul>
          </div>

          {/* Gardening Categories */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-gray-800 dark:text-white">Garden Categories</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition">
                  Composting
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition">
                  Plant Care
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition">
                  Vertical Gardening
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition">
                  Hydroponics
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition">
                  Balcony Gardens
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-gray-800 dark:text-white">Contact Us</h4>
            <address className="not-italic text-gray-600 dark:text-gray-300 space-y-2">
              <p>DAG-1851,</p>
              <p>East Rampura, Dhaka</p>
              <p>Email: <a href="anikroy302@gmail.com" className="hover:text-primary-500 dark:hover:text-primary-400 transition">anikroy302@gmail.com</a></p>
              <p>Phone: <a href="tel:+15551234567" className="hover:text-primary-500 dark:hover:text-primary-400 transition">+8801722718821</a></p>
            </address>
          </div>
        </div>

        {/* Newsletter Subscription (Optional) */}
        <div className="border-t border-b dark:border-gray-700 py-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Subscribe to our Newsletter</h4>
              <p className="text-gray-600 dark:text-gray-300">Stay updated with the latest gardening tips and community news.</p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
              />
              <button className="btn btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            &copy; {currentYear} GardenHub. All rights reserved.
          </p>
          <div className="flex justify-center space-x-6 mt-2">
            <Link to="/terms" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 text-sm transition">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 text-sm transition">
              Privacy Policy
            </Link>
            <Link to="/cookies" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 text-sm transition">
              Cookie Policy
            </Link>
          </div>
          <p className='text-sm mt-8 text-[#bdbdbd] dark:text-[#646464]'>Dev-Anik-Roy</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;