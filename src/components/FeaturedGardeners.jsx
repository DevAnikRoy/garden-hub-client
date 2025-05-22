import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaLeaf } from 'react-icons/fa';
import { Fade } from 'react-awesome-reveal';
import LoadingSpinner from './LoadingSpinner';

const FeaturedGardeners = () => {
  const [gardeners, setGardeners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGardeners = async () => {
      try {
        const response = await fetch('http://localhost:3000/gardeners',)
        const data = await response.json()

        // Filter only active gardeners
        // const activeGardeners = data.filter(gardener => gardener.status === "active");

        setGardeners(data?.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching gardeners:', error);
        setLoading(false);
      }
    };

    fetchGardeners();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <Fade triggerOnce>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Featured Gardeners
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Connect with our most active community members who are changing how we think about gardening
            </p>
          </div>
        </Fade>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {gardeners.map((gardener, index) => (
            <Fade direction="up" delay={index * 100} triggerOnce key={gardener.id}>
              <div className="card group hover:scale-[1.02]">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={gardener.image}
                    alt={gardener.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className='absolute top-4 text-black rounded-lg p-1 right-4 bg-lime-300'>
                    <h4 className='text-sm'>{gardener.status} gardeners</h4>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                      {gardener.name}
                    </h3>
                    <div className="flex items-center bg-primary-100 dark:bg-primary-800 rounded-full px-2 py-1">
                      <FaStar className="text-yellow-500 w-4 h-4 mr-1" />
                      <span className="text-sm font-semibold">{gardener.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    {gardener.bio}
                  </p>
                  <div className="flex items-center text-primary-500 dark:text-primary-400 mb-4">
                    <FaLeaf className="mr-2" />
                    <span className="font-medium">{gardener.specialty}</span>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    {gardener.location}
                  </div>
                  <Link
                    to={`/gardener/${gardener.id}`}
                    className="btn btn-primary w-full text-center"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </Fade>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/explore-gardeners"
            className="btn btn-secondary py-3 px-8"
          >
            Explore All Gardeners
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedGardeners;