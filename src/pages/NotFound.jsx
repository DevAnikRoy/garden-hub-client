import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { Fade } from 'react-awesome-reveal';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50 dark:bg-gray-900">
      <Fade triggerOnce>
        <div className="text-center">
          <div className="mb-6">
            <img 
              src="https://images.pexels.com/photos/7728050/pexels-photo-7728050.jpeg?auto=compress&cs=tinysrgb&w=600" 
              alt="404 Not Found" 
              className="mx-auto w-60 h-60 object-cover rounded-lg"
            />
          </div>
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">404</h2>
          <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Page Not Found</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
            Oops! It seems like the garden path you're looking for doesn't exist or has been moved to a new location.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition"
          >
            <FaArrowLeft className="mr-2" />
            Back to Home
          </Link>
        </div>
      </Fade>
    </div>
  );
};

export default NotFound;