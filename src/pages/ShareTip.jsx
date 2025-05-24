import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';
import { Fade } from 'react-awesome-reveal';

const ShareTip = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        plantType: '',
        difficultyLevel: 'Easy',
        description: '',
        image: '',
        category: 'Plant Care',
        status: 'public',
        userEmail: currentUser?.email || '',
        userName: currentUser?.displayName || '',
        totalLiked: 0
    });

    const [loading, setLoading] = useState(false);

    const difficultyLevels = ['Easy', 'Medium', 'Hard'];
    const categories = [
        'Plant Care',
        'Composting',
        'Vertical Gardening',
        'Hydroponics',
        'Organic Gardening',
        'Indoor Plants',
        'Sustainable Gardening',
        'Herb Gardening',
        'DIY Garden Projects',
        'Balcony Gardening'
    ];
    const availabilityOptions = ['Public', 'Hidden'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate required fields
        const { title, plantType, description, image } = formData;
        if (!title || !plantType || !description || !image) {
            return toast.error('Please fill in all required fields');
        }

        try {
            setLoading(true);

            const response = await fetch(`${import.meta.env.VITE_API_PAGE_URL}/share-tip`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                toast.success('Tip shared successfully!');
                navigate('/my-tips');
            } else {
                throw new Error(result.message || 'Failed to share tip');
            }

        } catch (error) {
            console.error('Error sharing tip:', error);
            toast.error('Failed to share tip');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen pt-24 pb-12 px-4">
            <div className="container mx-auto">
                <Fade triggerOnce>
                    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                        <div className="p-6 sm:p-8">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                                Share Your Garden Tip
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="e.g., How I Grow Tomatoes Indoors"
                                        className="form-input"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="plantType" className="form-label">Plant Type/Topic</label>
                                    <input
                                        type="text"
                                        id="plantType"
                                        name="plantType"
                                        value={formData.plantType}
                                        onChange={handleChange}
                                        placeholder="e.g., Tomatoes, Succulents, Composting"
                                        className="form-input"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="difficultyLevel" className="form-label">Difficulty Level</label>
                                        <select
                                            id="difficultyLevel"
                                            name="difficultyLevel"
                                            value={formData.difficultyLevel}
                                            onChange={handleChange}
                                            className="form-input"
                                            required
                                        >
                                            {difficultyLevels.map((level) => (
                                                <option key={level} value={level}>{level}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="category" className="form-label">Category</label>
                                        <select
                                            id="category"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            className="form-input"
                                            required
                                        >
                                            {categories.map((category) => (
                                                <option key={category} value={category}>{category}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows="6"
                                        placeholder="Share your gardening knowledge, techniques, and tips..."
                                        className="form-input"
                                        required
                                    ></textarea>
                                </div>

                                <div>
                                    <label htmlFor="image" className="form-label">Image URL</label>
                                    <input
                                        type="url"
                                        id="image"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleChange}
                                        placeholder="https://example.com/image.jpg"
                                        className="form-input"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="status" className="form-label">Status</label>
                                    <select
                                        id="status"
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="form-input"
                                        required
                                    >
                                        {availabilityOptions.map((option) => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="userEmail" className="form-label">User Email</label>
                                        <input
                                            type="email"
                                            id="userEmail"
                                            name="userEmail"
                                            value={formData.userEmail}
                                            className="form-input bg-gray-100 dark:bg-gray-700"
                                            readOnly
                                            disabled
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="userName" className="form-label">User Name</label>
                                        <input
                                            type="text"
                                            id="userName"
                                            name="userName"
                                            value={formData.userName}
                                            className="form-input bg-gray-100 dark:bg-gray-700"
                                            readOnly
                                            disabled
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="btn btn-primary py-3 px-8"
                                    >
                                        {loading ? 'Sharing...' : 'Share Tip'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Fade>
            </div>
        </div>
    );
};

export default ShareTip;