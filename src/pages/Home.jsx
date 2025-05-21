import HeroSlider from '../components/HeroSlider';
import FeaturedGardeners from '../components/FeaturedGardeners';
import TrendingTips from '../components/TrendingTips';
import GardeningStats from '../components/GardeningStats';
import SeasonalGuide from '../components/SeasonalGuide';

const Home = () => {
    return (
        <div>
            <div className="pt-16">
                <HeroSlider />
            </div>
            <FeaturedGardeners />
            <TrendingTips />
            <GardeningStats />
            <SeasonalGuide />
        </div>
    );
};

export default Home;