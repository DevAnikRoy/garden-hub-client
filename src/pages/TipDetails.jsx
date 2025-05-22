import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaHeart, FaRegHeart, FaLeaf, FaUser, FaCalendarAlt, FaEdit, FaTrash } from 'react-icons/fa';
import { Fade } from 'react-awesome-reveal';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'react-hot-toast';

const TipDetails = () => {
    const { id } = useParams();
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const [tip, setTip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [liked, setLiked] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    useEffect(() => {
        const fetchTip = async () => {
            try {
                // Simulating API call with local data for demo
                // In a real app, this would be: await axios.get(`${import.meta.env.VITE_API_URL}/tips/${id}`);

                // Mock data for the tip
                const tipData = {
                    id: id,
                    title: "Growing Tomatoes in Small Spaces",
                    plantType: "Tomatoes",
                    difficultyLevel: "Easy",
                    category: "Plant Care",
                    description: "Everything you need to know about growing tomatoes in small spaces - from containers to vertical growing systems.\n\nTomatoes are one of the most popular vegetables to grow at home, and for good reason! They're versatile, delicious, and can be grown in surprisingly small spaces. Whether you have a tiny balcony, a small patio, or just a sunny windowsill, you can successfully grow tomatoes.\n\n## Choosing the Right Varieties\n\nWhen space is limited, focus on determinate or dwarf varieties:\n\n- **Cherry tomatoes** like 'Tiny Tim' or 'Patio Princess' stay compact\n- **Bush varieties** like 'Roma' or 'Bush Beefsteak' don't require as much vertical space\n- **Container-specific** varieties bred for small spaces\n\n## Container Selection\n\nThe right container can make all the difference:\n\n- Use containers at least 5 gallons in size per plant\n- Ensure good drainage with multiple holes\n- Consider self-watering containers to maintain consistent moisture\n- Fabric pots work well as they prevent root circling and provide aeration\n\n## Vertical Growing Systems\n\nMaximize your space by growing up, not out:\n\n- Install a trellis or tomato cage in your container\n- Use hanging baskets for trailing varieties\n- Try upside-down planters that hang from balconies or hooks\n- Consider wall-mounted systems with multiple pockets\n\n## Optimal Care for Small-Space Tomatoes\n\n- **Sunlight**: Ensure 6+ hours of direct sunlight daily\n- **Water**: Keep soil consistently moist but not waterlogged\n- **Fertilizer**: Use a balanced organic fertilizer every 2-3 weeks\n- **Pruning**: Remove suckers for indeterminate varieties to focus energy on fruit production\n\nWith these techniques, you can grow a surprisingly abundant tomato harvest even in the smallest of spaces!",
                    image: "https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                    totalLiked: 245,
                    createdAt: "2025-01-15T12:00:00Z",
                    authorId: "user123",  // This would be the Firebase UID in a real app
                    authorName: "Emily Turner",
                    authorImage: "https://images.pexels.com/photos/7648047/pexels-photo-7648047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                };

                setTip(tipData);
                // For demo purposes, let's say the current user is the author if they're logged in
                setLiked(false);  // Initially not liked
                setLoading(false);
            } catch (error) {
                console.error('Error fetching tip:', error);
                toast.error('Failed to load tip');
                setLoading(false);
            }
        };

        fetchTip();
    }, [id, currentUser]);

    const handleLike = async () => {
        if (!currentUser) {
            toast.error('Please sign in to like tips');
            return;
        }

        try {
            // In a real app, this would be an actual API call:
            // await axios.post(`${import.meta.env.VITE_API_URL}/tips/${id}/like`, {
            //   userId: currentUser.uid
            // });

            // For demo purposes, just update the state locally
            setLiked(!liked);
            setTip({
                ...tip,
                totalLiked: liked ? tip.totalLiked - 1 : tip.totalLiked + 1
            });

            toast.success(liked ? 'Removed like' : 'Tip liked successfully!');
        } catch (error) {
            console.error('Error liking tip:', error);
            toast.error('Failed to like tip');
        }
    };

    const handleDelete = async () => {
        try {
            // In a real app, this would be an actual API call:
            // await axios.delete(`${import.meta.env.VITE_API_URL}/tips/${id}`);

            toast.success('Tip deleted successfully!');
            navigate('/my-tips');
        } catch (error) {
            console.error('Error deleting tip:', error);
            toast.error('Failed to delete tip');
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Check if the current user is the author
    const isAuthor = currentUser && tip?.authorId === 'user123';  // In a real app, would be: tip?.authorId === currentUser.uid

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
                                                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                                                    <FaCalendarAlt className="mr-1" />
                                                    <span>{formatDate(tip.createdAt)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex space-x-2">
                                        <button
                                            onClick={handleLike}
                                            className={`flex items-center space-x-1 px-3 py-1 rounded-full ${liked
                                                    ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300'
                                                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                                                }`}
                                        >
                                            {liked ? <FaHeart /> : <FaRegHeart />}
                                            <span>{tip.totalLiked}</span>
                                        </button>

                                        {isAuthor && (
                                            <>
                                                <Link
                                                    to={`/update-tip/${tip.id}`}
                                                    className="flex items-center space-x-1 px-3 py-1 rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300"
                                                >
                                                    <FaEdit />
                                                    <span>Edit</span>
                                                </Link>
                                                <button
                                                    onClick={() => setShowDeleteConfirm(true)}
                                                    className="flex items-center space-x-1 px-3 py-1 rounded-full bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
                                                >
                                                    <FaTrash />
                                                    <span>Delete</span>
                                                </button>
                                            </>
                                        )}
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
                                    {tip.description.split('\n\n').map((paragraph, index) => (
                                        <p key={index} className="mb-4 text-gray-700 dark:text-gray-300">
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Delete confirmation modal */}
                        {showDeleteConfirm && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                                        Confirm Deletion
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                                        Are you sure you want to delete this tip? This action cannot be undone.
                                    </p>
                                    <div className="flex justify-end space-x-2">
                                        <button
                                            onClick={() => setShowDeleteConfirm(false)}
                                            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleDelete}
                                            className="px-4 py-2 rounded bg-red-600 text-white"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

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