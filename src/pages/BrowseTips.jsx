import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaEye, FaFilter } from 'react-icons/fa';
import { Fade } from 'react-awesome-reveal';
import LoadingSpinner from '../components/LoadingSpinner';

const BrowseTips = () => {
  const [tips, setTips] = useState([]);
  const [filteredTips, setFilteredTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  useEffect(() => {
    const fetchTips = async () => {
      try {
        setLoading(true)
        const response = await fetch('http://localhost:3000/browse-tips',)
        const data = await response.json()
        
        // Filter only public tips
        // const publicTips = data.data
        const publicTips = data.filter(tip => tip.status === "public");
        
        setTips(publicTips);
        setFilteredTips(publicTips);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tips:', error);
        setLoading(false);
      }
    };

    fetchTips();
  }, []);

  // Get unique categories
  const categories = [...new Set(tips.map(tip => tip.category))];
  
  useEffect(() => {
    let results = tips;
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(tip => 
        tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tip.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tip.plantType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply difficulty filter
    if (selectedDifficulty) {
      results = results.filter(tip => tip.difficultyLevel === selectedDifficulty);
    }
    
    // Apply category filter
    if (selectedCategory) {
      results = results.filter(tip => tip.category === selectedCategory);
    }
    
    setFilteredTips(results);
  }, [searchTerm, selectedDifficulty, selectedCategory, tips]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDifficultyFilter = (e) => {
    setSelectedDifficulty(e.target.value);
  };

  const handleCategoryFilter = (e) => {
    setSelectedCategory(e.target.value);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDifficulty('');
    setSelectedCategory('');
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto">
        <Fade triggerOnce>
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Browse Garden Tips
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore our collection of gardening wisdom shared by our community of passionate gardeners
            </p>
          </div>
        </Fade>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <label htmlFor="search" className="form-label">Search Tips</label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  placeholder="Search by title, description, or plant type"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="form-input pl-10"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            
            <div className="w-full md:w-48">
              <label htmlFor="difficulty" className="form-label">Difficulty</label>
              <select
                id="difficulty"
                value={selectedDifficulty}
                onChange={handleDifficultyFilter}
                className="form-input"
              >
                <option value="">All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            
            <div className="w-full md:w-64">
              <label htmlFor="category" className="form-label">Category</label>
              <select
                id="category"
                value={selectedCategory}
                onChange={handleCategoryFilter}
                className="form-input"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <button
              onClick={clearFilters}
              className="btn btn-secondary py-3 md:self-stretch"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {filteredTips.length > 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Image
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Difficulty
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Author
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredTips.map((tip) => (
                    <tr key={tip.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-16 w-24 overflow-hidden rounded">
                          <img src={tip.image} alt={tip.title} className="h-full w-full object-cover" />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {tip.title}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                          {tip.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {tip.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          tip.difficultyLevel === 'Easy' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                            : tip.difficultyLevel === 'Medium'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {tip.difficultyLevel}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8">
                            <img className="h-8 w-8 rounded-full" src={tip.authorImage} alt={tip.authorName} />
                          </div>
                          <div className="ml-2">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{tip.authorName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link 
                          to={`/tip/${tip.id}`} 
                          className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 flex items-center"
                        >
                          <FaEye className="mr-1" />
                          See More
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow">
            <FaFilter className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No matching tips found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">Try adjusting your search or filter criteria</p>
            <button
              onClick={clearFilters}
              className="btn btn-primary"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseTips;