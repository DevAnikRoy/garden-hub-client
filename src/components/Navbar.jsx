import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { Tooltip } from 'react-tooltip';
import logo from '../assets/images/logo.png';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Toggle user dropdown
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white dark:bg-gray-800 shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Garden Hub Logo" className="h-10 w-auto" />
            <span className="text-xl font-bold text-primary-500 dark:text-primary-400">
              GardenHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `font-medium transition ${isActive ? 'text-primary-500 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400'}`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/browse-tips" 
              className={({ isActive }) => 
                `font-medium transition ${isActive ? 'text-primary-500 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400'}`
              }
            >
              Browse Tips
            </NavLink>
            <NavLink 
              to="/explore-gardeners" 
              className={({ isActive }) => 
                `font-medium transition ${isActive ? 'text-primary-500 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400'}`
              }
            >
              Explore Gardeners
            </NavLink>
            
            {currentUser && (
              <>
                <NavLink 
                  to="/share-tip" 
                  className={({ isActive }) => 
                    `font-medium transition ${isActive ? 'text-primary-500 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400'}`
                  }
                >
                  Share a Tip
                </NavLink>
                <NavLink 
                  to="/my-tips" 
                  className={({ isActive }) => 
                    `font-medium transition ${isActive ? 'text-primary-500 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400'}`
                  }
                >
                  My Tips
                </NavLink>
              </>
            )}
            
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              data-tooltip-id="theme-tooltip"
              data-tooltip-content={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </button>
            <Tooltip id="theme-tooltip" />

            {/* User Authentication */}
            {currentUser ? (
              <div className="relative">
                <div 
                  className="flex items-center cursor-pointer"
                  onClick={toggleDropdown}
                  data-tooltip-id="user-tooltip"
                  data-tooltip-content={currentUser.displayName || currentUser.email}
                >
                  <img 
                    src={currentUser.photoURL || 'https://via.placeholder.com/150'} 
                    alt="User" 
                    className="w-10 h-10 rounded-full border-2 border-primary-500"
                  />
                </div>
                <Tooltip id="user-tooltip" />
                
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
                    <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b dark:border-gray-700">
                      {currentUser.displayName || currentUser.email}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary">
                Login/Signup
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <FiX className="h-6 w-6 text-gray-700 dark:text-white" />
            ) : (
              <FiMenu className="h-6 w-6 text-gray-700 dark:text-white" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t dark:border-gray-700">
            <div className="flex flex-col space-y-3 mt-3">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `px-2 py-1 font-medium ${isActive ? 'text-primary-500 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink 
                to="/browse-tips" 
                className={({ isActive }) => 
                  `px-2 py-1 font-medium ${isActive ? 'text-primary-500 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Tips
              </NavLink>
              <NavLink 
                to="/explore-gardeners" 
                className={({ isActive }) => 
                  `px-2 py-1 font-medium ${isActive ? 'text-primary-500 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Explore Gardeners
              </NavLink>
              
              {currentUser && (
                <>
                  <NavLink 
                    to="/share-tip" 
                    className={({ isActive }) => 
                      `px-2 py-1 font-medium ${isActive ? 'text-primary-500 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'}`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Share a Tip
                  </NavLink>
                  <NavLink 
                    to="/my-tips" 
                    className={({ isActive }) => 
                      `px-2 py-1 font-medium ${isActive ? 'text-primary-500 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'}`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Tips
                  </NavLink>
                </>
              )}
              
              <div className="flex items-center justify-between px-2 py-2">
                <button 
                  onClick={toggleTheme} 
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
                  <span className="ml-2">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </div>
              
              {currentUser ? (
                <div className="px-2 py-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <img 
                      src={currentUser.photoURL || 'https://via.placeholder.com/150'} 
                      alt="User" 
                      className="w-8 h-8 rounded-full border-2 border-primary-500"
                    />
                    <span className="text-sm font-medium">{currentUser.displayName || currentUser.email}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="btn btn-primary w-full"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link 
                  to="/login" 
                  className="btn btn-primary mx-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login/Signup
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;