import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaEdit, FaTrash, FaEye, } from 'react-icons/fa';
import { Fade } from 'react-awesome-reveal';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'react-hot-toast';

const MyTips = () => {
    const { currentUser } = useAuth();
    const [tips, setTips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteConfirmation, setDeleteConfirmation] = useState(null);

    useEffect(() => {
        const fetchMyTips = async () => {
            try {
                
                setLoading(true)
                const response = await fetch('http://localhost:3000/my-tips',)
                const userTips = await response.json()
                const data = userTips.filter(tip => tip.userEmail === currentUser.email);

                setTips(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching my tips:', error);
                setLoading(false);
            }
        };

        fetchMyTips();
    }, [currentUser]);

    const confirmDelete = (tipId) => {
        setDeleteConfirmation(tipId);
    };

    const cancelDelete = () => {
        setDeleteConfirmation(null);
    };

    const handleDelete = async (id) => {
        try {
            
            fetch(`http://localhost:3000/my-tips/${id}`, {
                method: 'DELETE'

            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                })

            toast.success('Tip deleted successfully!');
            setDeleteConfirmation(null);
        } catch (error) {
            console.error('Error deleting tip:', error);
            toast.error('Failed to delete tip');
        }
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
                            My Garden Tips
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Manage all your gardening knowledge in one place
                        </p>
                    </div>
                </Fade>

                <div className="mb-8 flex justify-end">
                    <Link
                        to="/share-tip"
                        className="btn btn-primary py-3 px-6"
                    >
                        Share a New Tip
                    </Link>
                </div>

                {tips.length > 0 ? (
                    <div className="space-y-6">
                        {tips.map((tip) => (
                            <Fade key={tip.id} triggerOnce>
                                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                                    <div className="p-6">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                                            <div className="flex items-start space-x-4">
                                                <div className="h-16 w-16 md:h-24 md:w-24 flex-shrink-0 overflow-hidden rounded-md">
                                                    <img src={tip.image} alt={tip.title} className="h-full w-full object-cover" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                                                        {tip.title}
                                                    </h3>
                                                    <div className="flex flex-wrap gap-2 mt-2 mb-2">
                                                        <span className="px-2 py-1 text-xs rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                                                            {tip.category}
                                                        </span>
                                                        <span className={`px-2 py-1 text-xs rounded-full ${tip.difficultyLevel === 'Easy'
                                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                                : tip.difficultyLevel === 'Medium'
                                                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                                                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                            }`}>
                                                            {tip.difficultyLevel}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {tip.totalLiked} likes
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-2 mt-4 md:mt-0">
                                                <Link
                                                    to={`/tip/${tip.id}`}
                                                    className="btn bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded inline-flex items-center"
                                                >
                                                    <FaEye className="mr-1" />
                                                    <span>View</span>
                                                </Link>
                                                <Link
                                                    to={`/update-tip/${tip.id}`}
                                                    className="btn bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-3 rounded inline-flex items-center"
                                                >
                                                    <FaEdit className="mr-1" />
                                                    <span>Edit</span>
                                                </Link>
                                                <button
                                                    onClick={() => confirmDelete(tip.id)}
                                                    className="btn bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded inline-flex items-center"
                                                >
                                                    <FaTrash className="mr-1" />
                                                    <span>Delete</span>
                                                </button>
                                            </div>
                                        </div>
                                        
                                        {/* Delete confirmation */}
                                        {deleteConfirmation === tip.id && (
                                            <div className="mt-4 pt-4 border-t dark:border-gray-700">
                                                <div className="bg-red-50 dark:bg-red-900 p-4 rounded-md">
                                                    <h4 className="text-red-800 dark:text-red-200 font-bold mb-2">
                                                        Confirm Deletion
                                                    </h4>
                                                    <p className="text-red-700 dark:text-red-300 mb-4">
                                                        Are you sure you want to delete "{tip.title}"? This action cannot be undone.
                                                    </p>
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => handleDelete(tip.id)}
                                                            className="btn bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
                                                        >
                                                            Yes, Delete
                                                        </button>
                                                        <button
                                                            onClick={cancelDelete}
                                                            className="btn bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Fade>
                        ))}
                    </div>
                ) : (
                    <div className="text-center p-12 bg-white dark:bg-gray-800 rounded-lg shadow">
                        <img
                            src="https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="No tips found"
                            className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                        />
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                            No Garden Tips Yet
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Share your gardening knowledge with the community by adding your first tip!
                        </p>
                        <Link
                            to="/share-tip"
                            className="btn btn-primary py-3 px-8"
                        >
                            Create Your First Tip
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyTips;