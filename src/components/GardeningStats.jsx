import { useEffect, useState } from 'react';
import { FaUsers, FaLeaf, FaHandHoldingHeart, FaGlobeAmericas } from 'react-icons/fa';
import { Fade } from 'react-awesome-reveal';
import { useInView } from 'react-intersection-observer';
import { useTypewriter } from 'react-simple-typewriter';

const GardeningStats = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [counts, setCounts] = useState({
    members: 0,
    tips: 0,
    communities: 0,
    countries: 0,
  });

  const [text] = useTypewriter({
    words: ['Join our growing community!', 'Share your gardening wisdom!', 'Learn from experts worldwide!', 'Connect with nature lovers!'],
    loop: true,
    typeSpeed: 70,
    deleteSpeed: 50,
    delaySpeed: 1500,
  });

  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        setCounts(prev => ({
          members: prev.members < 10000 ? prev.members + 100 : 10000,
          tips: prev.tips < 5000 ? prev.tips + 50 : 5000,
          communities: prev.communities < 450 ? prev.communities + 5 : 450,
          countries: prev.countries < 75 ? prev.countries + 1 : 75,
        }));
      }, 20);

      return () => clearInterval(interval);
    }
  }, [inView]);

  return (
    <section className="py-16 bg-primary-500 dark:bg-primary-600 text-white">
      <div className="container mx-auto px-4" ref={ref}>
        <Fade triggerOnce>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Growing Garden Community</h2>
            <p className="text-xl opacity-90 h-8">{text}</p>
          </div>
        </Fade>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Fade direction="up" delay={100} triggerOnce>
            <div className="text-center p-6 bg-white bg-opacity-10 rounded-lg">
              <div className="flex justify-center mb-4">
                <FaUsers className="text-4xl" />
              </div>
              <h3 className="text-3xl font-bold mb-2">{counts.members.toLocaleString()}</h3>
              <p className="text-lg opacity-90">Garden Enthusiasts</p>
            </div>
          </Fade>

          <Fade direction="up" delay={200} triggerOnce>
            <div className="text-center p-6 bg-white bg-opacity-10 rounded-lg">
              <div className="flex justify-center mb-4">
                <FaLeaf className="text-4xl" />
              </div>
              <h3 className="text-3xl font-bold mb-2">{counts.tips.toLocaleString()}</h3>
              <p className="text-lg opacity-90">Gardening Tips Shared</p>
            </div>
          </Fade>

          <Fade direction="up" delay={300} triggerOnce>
            <div className="text-center p-6 bg-white bg-opacity-10 rounded-lg">
              <div className="flex justify-center mb-4">
                <FaHandHoldingHeart className="text-4xl" />
              </div>
              <h3 className="text-3xl font-bold mb-2">{counts.communities.toLocaleString()}</h3>
              <p className="text-lg opacity-90">Local Communities</p>
            </div>
          </Fade>

          <Fade direction="up" delay={400} triggerOnce>
            <div className="text-center p-6 bg-white bg-opacity-10 rounded-lg">
              <div className="flex justify-center mb-4">
                <FaGlobeAmericas className="text-4xl" />
              </div>
              <h3 className="text-3xl font-bold mb-2">{counts.countries.toLocaleString()}</h3>
              <p className="text-lg opacity-90">Countries Represented</p>
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
};

export default GardeningStats;