import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaLeaf, FaSearch, FaFilter } from 'react-icons/fa';
import { Fade } from 'react-awesome-reveal';
import LoadingSpinner from '../components/LoadingSpinner';

const ExploreGardeners = () => {
    const [gardeners, setGardeners] = useState([]);
    const [filteredGardeners, setFilteredGardeners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSpecialty, setSelectedSpecialty] = useState('');

    useEffect(() => {
        const fetchGardeners = async () => {
            try {


                const response = await fetch(`${import.meta.env.VITE_API_PAGE_URL}/explore-gardeners`)
                const data = await response.json()
                // console.log(data)



                setGardeners(data?.data);
                setFilteredGardeners(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching gardeners:', error);
                setLoading(false);
            }
        };

        fetchGardeners();
    }, []);

    // Get unique specialties
    const specialties = [...new Set(gardeners.map(gardener => gardener.specialty))];

    useEffect(() => {
        let results = gardeners;

        // Apply search filter
        if (searchTerm) {
            results = results.filter(gardener =>
                gardener.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                gardener.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
                gardener.location.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply specialty filter
        if (selectedSpecialty) {
            results = results.filter(gardener => gardener.specialty === selectedSpecialty);
        }

        setFilteredGardeners(results);
    }, [searchTerm, selectedSpecialty, gardeners]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSpecialtyFilter = (e) => {
        setSelectedSpecialty(e.target.value);
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedSpecialty('');
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
                            Explore Gardeners
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Connect with passionate gardeners from around the world and learn from their expertise
                        </p>
                    </div>
                </Fade>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
                    <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-4">
                        <div className="flex-1">
                            <label htmlFor="search" className="form-label">Search Gardeners</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="search"
                                    placeholder="Search by name, bio, or location"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    className="form-input pl-10"
                                />
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>

                        <div className="w-full md:w-64">
                            <label htmlFor="specialty" className="form-label">Specialty</label>
                            <select
                                id="specialty"
                                value={selectedSpecialty}
                                onChange={handleSpecialtyFilter}
                                className="form-input"
                            >
                                <option value="">All Specialties</option>
                                {specialties.map(specialty => (
                                    <option key={specialty} value={specialty}>{specialty}</option>
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

                {filteredGardeners.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredGardeners.map((gardener) => (
                            <Fade key={gardener.id} triggerOnce>
                                <div className="card group hover:scale-[1.02]">
                                    <div className="aspect-[4/3] overflow-hidden">
                                        <img
                                            src={gardener.image}
                                            alt={gardener.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        
                                    </div>
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                                                {gardener.name}<br />
                                                <span className='text-sm'>Age: {gardener.age}</span>
                                            </h3>

                                            <div className="flex items-center bg-primary-100 dark:bg-primary-800 rounded-full px-2 py-1">
                                                <FaStar className="text-yellow-500 w-4 h-4 mr-1" />
                                                <span className="text-sm font-semibold">{gardener.rating}</span>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-300 mb-3">
                                            {gardener.experiences}
                                        </p>
                                        <div className=" text-primary-500 dark:text-primary-400 mb-4 space-y-3">
                                            <div className='flex items-center justify-start'>
                                                <FaLeaf className="mr-2" />
                                                <span className="font-medium">{gardener.specialty}</span>
                                            </div>
                                                
                                            <div>
                                                <h4 className='text-xs dark:text-lime-300'>Tips: <span className='font-bold'>{gardener.totalSharedTips}</span></h4>
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex justify-between items-center">
                                            {gardener.location}
                                            <h4 className='text-center text-black rounded-lg px-2 bg-lime-300'>{gardener.status}</h4>
                                        </div>
                                        
                                        {/* <Link
                                            to={`/gardener/${gardener.id}`}
                                            className="btn btn-primary w-full text-center"
                                        >
                                            View Profile
                                        </Link> */}
                                    </div>
                                    
                                </div>
                            </Fade>
                            
                        ))}
                    </div>
                ) : (
                    <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow">
                        <FaFilter className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No matching gardeners found</h3>
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

export default ExploreGardeners;