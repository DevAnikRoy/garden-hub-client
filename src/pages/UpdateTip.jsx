import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';
import { Fade } from 'react-awesome-reveal';
import LoadingSpinner from '../components/LoadingSpinner';

const UpdateTip = () => {
    const { id } = useParams();
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        plantType: '',
        difficultyLevel: '',
        description: '',
        image: '',
        category: '',
        availability: '',
        userEmail: currentUser?.email || '',
        userName: currentUser?.displayName || ''
    });

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

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

    useEffect(() => {
        const fetchTip = async () => {
            try {
                

                const response = await fetch(`http://localhost:3000/my-tips/${id}`,)
                const data = await response.json()
                const tipData = data.filter(tip => tip.id === currentUser.id);

                setFormData(tipData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching tip:', error);
                toast.error('Failed to load tip data');
                setLoading(false);
                navigate('/my-tips');
            }
        };

        fetchTip();
    }, [id, currentUser, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.title || !formData.plantType || !formData.description || !formData.image) {
            return toast.error('Please fill in all required fields');
        }

        try {
            setSubmitting(true);
            
            fetch(`http://localhost:3000/update-tip/${id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                })

            toast.success('Tip updated successfully!');
            navigate('/my-tips');
        } catch (error) {
            console.error('Error updating tip:', error);
            toast.error('Failed to update tip');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="min-h-screen pt-24 pb-12 px-4">
            <div className="container mx-auto">
                <Fade triggerOnce>
                    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                        <div className="p-6 sm:p-8">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                                Update Garden Tip
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
                                    <label htmlFor="availability" className="form-label">Availability</label>
                                    <select
                                        id="availability"
                                        name="availability"
                                        value={formData.availability}
                                        onChange={handleChange}
                                        className="form-input"
                                        required
                                    >
                                        {availabilityOptions.map((option) => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex justify-between">
                                    <button
                                        type="button"
                                        onClick={() => navigate('/my-tips')}
                                        className="btn bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-700 text-gray-800 dark:text-white py-3 px-8"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="btn btn-primary py-3 px-8"
                                    >
                                        {submitting ? 'Updating...' : 'Update Tip'}
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

export default UpdateTip;