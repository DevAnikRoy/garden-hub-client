import { useTheme } from '../contexts/ThemeContext';

const LoadingSpinner = () => {
    const { darkMode } = useTheme();

    return (
        <div className="flex justify-center items-center min-h-screen absolute inset-0">
            <div className="inline-block">
                <svg className={`animate-spin h-12 w-12 ${darkMode ? 'text-white' : 'text-primary-500'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="mt-3 text-center font-medium">Loading...</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;