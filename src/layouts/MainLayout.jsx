import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useTheme } from '../contexts/ThemeContext';

const MainLayout = () => {
  const { darkMode } = useTheme();
  
  return (
    <div className={darkMode ? 'dark' : ''}>
      <Navbar />
      <main className="min-h-screen dark:bg-gray-900">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;