import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf, FaHeart, FaRegHeart, FaEye } from 'react-icons/fa';
import { Fade } from 'react-awesome-reveal';
import LoadingSpinner from './LoadingSpinner';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';

const TrendingTips = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [like, setLike] = useState(false)
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchTrendingTips = async () => {
      try {
        
        setLoading(true)
        const response = await fetch(`${import.meta.env.VITE_API_PAGE_URL}/gardeners/tips`,)
        const data = await response.json()
        
        
        setTips(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trending tips:', error);
        setLoading(false);
      }
    };

    fetchTrendingTips();
  }, [like]);

  const handleLike = async (tipId) => {
    if (!currentUser) {
      toast.error('Please sign in to like tips');
      return;
    }

    try {
      
    setLoading(true)
    await fetch(`${import.meta.env.VITE_API_PAGE_URL}/like/${tipId}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    setLike(drave=>!drave)

      toast.success('Tip liked successfully!');
    } catch (error) {
      console.error('Error liking tip:', error);
      toast.error('Failed to like tip');
    }
    finally{setLoading(false)}
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <Fade triggerOnce>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Top Trending Tips
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover our community's most popular gardening advice
            </p>
          </div>
        </Fade>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tips.map((tip, index) => (
            <Fade direction="up" delay={index * 100} triggerOnce key={tip.id}>
              <div className="card group hover:scale-[1.02]">
                <div className="relative aspect-[3/2] overflow-hidden">
                  <img 
                    src={tip.image} 
                    alt={tip.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      tip.difficultyLevel === 'Easy' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : tip.difficultyLevel === 'Medium'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {tip.difficultyLevel}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <img 
                      src={tip.authorImage} 
                      alt={tip.authorName} 
                      className="h-8 w-8 rounded-full mr-2"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {tip.authorName}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    {tip.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {tip.description.length > 100 
                      ? tip.description.substring(0, 100) + '...' 
                      : tip.description}
                  </p>
                  <div className="flex items-center text-primary-500 dark:text-primary-400 mb-4">
                    <FaLeaf className="mr-2" />
                    <span className="font-medium">{tip.category}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleLike(tip.id)}
                        className="flex items-center space-x-1 text-gray-600 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400 transition"
                      >
                        <FaRegHeart />
                        <span>{tip.totalLiked}</span>
                      </button>
                    </div>
                    <Link 
                      to={`/tip/${tip.id}`} 
                      className="btn btn-primary py-2 px-4 inline-flex items-center"
                    >
                      <FaEye className="mr-2" />
                      See More
                    </Link>
                  </div>
                </div>
              </div>
            </Fade>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/browse-tips" 
            className="btn btn-secondary py-3 px-8"
          >
            Browse All Tips
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrendingTips;