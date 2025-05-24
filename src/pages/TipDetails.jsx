import { useState, useEffect } from 'react';
import { useParams, Link, } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaLeaf, FaUser, } from 'react-icons/fa';
import { Fade } from 'react-awesome-reveal';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'react-hot-toast';

const TipDetails = () => {
    const { id } = useParams();
    const { currentUser } = useAuth();

    const [tip, setTip] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTip = async () => {
            try {
                setLoading(true)
                const response = await fetch(`${import.meta.env.VITE_API_PAGE_URL}/browse-tips/${id}`)
                const tipData = await response.json()
                setTip(tipData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching tip:', error);
                toast.error('Failed to load tip');
                setLoading(false);
            }
        };

        fetchTip();
    }, [id, currentUser]);

   

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!tip) {
        return (
            <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Tip Not Found</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        The garden tip you're looking for doesn't exist or has been removed.
                    </p>
                    <Link to="/browse-tips" className="btn btn-primary">
                        Browse Tips
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto">
                <div className="max-w-4xl mx-auto">
                    <Fade triggerOnce>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                            <div className="aspect-video overflow-hidden">
                                <img
                                    src={tip.image}
                                    alt={tip.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="p-6 sm:p-8">
                                <div className="flex flex-wrap justify-between items-center mb-6">
                                    <div className="flex items-center mb-4 sm:mb-0">
                                        <div className="flex items-center space-x-4">
                                            <img
                                                src={tip.authorImage}
                                                alt={tip.authorName}
                                                className="h-10 w-10 rounded-full"
                                            />
                                            <div>
                                                <h3 className="text-gray-700 dark:text-gray-300 font-medium">
                                                    {tip.authorName}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                                    {tip.title}
                                </h1>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    <span className="px-3 py-1 text-sm rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 flex items-center">
                                        <FaLeaf className="mr-1" />
                                        {tip.category}
                                    </span>
                                    <span className={`px-3 py-1 text-sm rounded-full ${tip.difficultyLevel === 'Easy'
                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                        : tip.difficultyLevel === 'Medium'
                                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                        }`}>
                                        {tip.difficultyLevel}
                                    </span>
                                    <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 flex items-center">
                                        <FaUser className="mr-1" />
                                        {tip.plantType}
                                    </span>
                                </div>

                                <div className="prose dark:prose-invert max-w-none">
                                    {tip.description}
                                </div>
                            </div>
                        </div>

                        

                        <div className="mt-8 flex justify-between">
                            <Link
                                to="/browse-tips"
                                className="btn bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-2 px-6 rounded"
                            >
                                Back to Tips
                            </Link>
                        </div>
                    </Fade>
                </div>
            </div>
        </div>
    );
};

export default TipDetails;