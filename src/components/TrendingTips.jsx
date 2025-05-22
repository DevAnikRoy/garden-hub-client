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
        // Simulating API call with local data for demo
        // In a real app, this would be: await axios.get(`${import.meta.env.VITE_API_URL}/tips/trending`);
        // const data = [
        //   {
        //     id: 1,
        //     title: "Growing Tomatoes in Small Spaces",
        //     plantType: "Tomatoes",
        //     difficultyLevel: "Easy",
        //     category: "Plant Care",
        //     description: "Everything you need to know about growing tomatoes in small spaces - from containers to vertical growing systems.",
        //     image: "https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        //     totalLiked: 245,
        //     authorName: "Emily Turner",
        //     authorImage: "https://images.pexels.com/photos/7648047/pexels-photo-7648047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        //     authorId: 5
        //   },
        //   {
        //     id: 2,
        //     title: "Water-Saving Techniques for Dry Climates",
        //     plantType: "Various",
        //     difficultyLevel: "Medium",
        //     category: "Sustainable Gardening",
        //     description: "Practical methods to conserve water while maintaining healthy plants in arid environments.",
        //     image: "https://images.pexels.com/photos/8054535/pexels-photo-8054535.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        //     totalLiked: 187,
        //     authorName: "David Park",
        //     authorImage: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        //     authorId: 6
        //   },
        //   {
        //     id: 3,
        //     title: "Beginners Guide to Vertical Gardening",
        //     plantType: "Mixed Varieties",
        //     difficultyLevel: "Easy",
        //     category: "Vertical Gardening",
        //     description: "How to maximize your space by growing upward - perfect for urban gardeners with limited space.",
        //     image: "https://images.pexels.com/photos/1084188/pexels-photo-1084188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        //     totalLiked: 156,
        //     authorName: "Michael Chen",
        //     authorImage: "https://images.pexels.com/photos/4994225/pexels-photo-4994225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        //     authorId: 2
        //   },
        //   {
        //     id: 4,
        //     title: "Natural Pest Control Solutions",
        //     plantType: "All Plants",
        //     difficultyLevel: "Medium",
        //     category: "Plant Care",
        //     description: "Keep pests away without using harmful chemicals with these natural and effective methods.",
        //     image: "https://images.pexels.com/photos/7919/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        //     totalLiked: 132,
        //     authorName: "Alice Johnson",
        //     authorImage: "https://images.pexels.com/photos/5273640/pexels-photo-5273640.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        //     authorId: 1
        //   },
        //   {
        //     id: 5,
        //     title: "Creating a Thriving Indoor Herb Garden",
        //     plantType: "Herbs",
        //     difficultyLevel: "Easy",
        //     category: "Herb Gardening",
        //     description: "Learn how to grow a year-round supply of fresh herbs right in your kitchen.",
        //     image: "https://images.pexels.com/photos/6231645/pexels-photo-6231645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        //     totalLiked: 124,
        //     authorName: "Sarah Williams",
        //     authorImage: "https://images.pexels.com/photos/7516347/pexels-photo-7516347.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        //     authorId: 3
        //   },
        //   {
        //     id: 6,
        //     title: "Building Raised Garden Beds on a Budget",
        //     plantType: "Vegetables",
        //     difficultyLevel: "Medium",
        //     category: "DIY",
        //     description: "Step-by-step guide to constructing durable raised beds with affordable materials.",
        //     image: "https://images.pexels.com/photos/7728087/pexels-photo-7728087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        //     totalLiked: 98,
        //     authorName: "James Rodriguez",
        //     authorImage: "https://images.pexels.com/photos/4195342/pexels-photo-4195342.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        //     authorId: 4
        //   }
        // ];
        
        // Sort by total likes (descending)
        // const sortedTips = data.sort((a, b) => b.totalLiked - a.totalLiked);
        setLoading(true)
        const response = await fetch('http://localhost:3000/gardeners/tips',)
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
      // In a real app, this would be an actual API call:
      // await axios.post(`${import.meta.env.VITE_API_URL}/tips/${tipId}/like`, {
      //   userId: currentUser.uid
      // });

      // For demo purposes, just update the state locally
    //   setTips(prevTips => 
    //     prevTips.map(tip => 
    //       tip.id === tipId ? { ...tip, totalLiked: tip.totalLiked + 1 } : tip
    //     )
    //   );
    setLoading(true)
    await fetch(`http://localhost:3000/like/${tipId}`,{
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