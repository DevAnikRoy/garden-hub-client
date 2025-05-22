import { useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import { FaSeedling, FaSun, FaLeaf, FaSnowflake } from 'react-icons/fa';

const SeasonalGuide = () => {
  const [activeTab, setActiveTab] = useState('spring');

  const seasonalData = {
    spring: {
      icon: <FaSeedling className="text-green-500 text-3xl" />,
      title: "Spring Gardening Guide",
      description: "As temperatures rise and frost recedes, it's time to wake up your garden from its winter slumber.",
      tasks: [
        "Start seeds indoors for summer vegetables",
        "Prune fruit trees and berry bushes before bud break",
        "Divide and transplant perennials early in the season",
        "Apply compost to garden beds as soil warms",
        "Start monitoring for pests as they become active"
      ],
      image: "https://images.pexels.com/photos/7728050/pexels-photo-7728050.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    summer: {
      icon: <FaSun className="text-yellow-500 text-3xl" />,
      title: "Summer Gardening Guide",
      description: "The growing season is in full swing! Focus on maintenance and harvesting your early crops.",
      tasks: [
        "Implement water conservation techniques during heat waves",
        "Mulch garden beds to retain moisture and prevent weeds",
        "Harvest vegetables regularly to encourage production",
        "Watch for signs of heat stress in plants",
        "Start seeds for fall crops in late summer"
      ],
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT_hufomt0LnxUeez9dAoK4bqP5zmyVY5ORw&s"
    },
    fall: {
      icon: <FaLeaf className="text-orange-500 text-3xl" />,
      title: "Fall Gardening Guide",
      description: "As summer heat fades, fall offers ideal conditions for planting and preparing for winter.",
      tasks: [
        "Plant spring-flowering bulbs before first frost",
        "Divide and transplant spring and summer blooming perennials",
        "Harvest and preserve end-of-season vegetables",
        "Clean up garden debris to prevent overwintering pests",
        "Add compost to beds and mulch perennials for winter protection"
      ],
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWq4Acp_USC7bFTfE5eWRuY5FN1mZ7L0lQSw&s"
    },
    winter: {
      icon: <FaSnowflake className="text-blue-300 text-3xl" />,
      title: "Winter Gardening Guide",
      description: "Even in the dormant season, there's plenty to do to prepare for a successful growing year ahead.",
      tasks: [
        "Plan next year's garden and order seeds early",
        "Inspect stored bulbs and tubers for damage",
        "Prune dormant trees and shrubs on mild days",
        "Maintain bird feeders to support wildlife",
        "Start seeds indoors for early spring crops"
      ],
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSggKQ12qyYoxqaNpIzXNgYzmgByu-VOjbzMA&s"
    }
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <Fade triggerOnce>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Seasonal Gardening Guide
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover what to plant, maintain, and harvest throughout the year
            </p>
          </div>
        </Fade>

        <div className="flex flex-wrap justify-center mb-8">
          <Fade direction="up" cascade triggerOnce>
            <div className="flex space-x-2 sm:space-x-4 bg-white dark:bg-gray-700 rounded-full p-1 shadow-md">
              {Object.keys(seasonalData).map((season) => (
                <button
                  key={season}
                  onClick={() => setActiveTab(season)}
                  className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 ${
                    activeTab === season 
                      ? 'bg-primary-500 text-white' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  {seasonalData[season].icon}
                  <span className="ml-2 font-medium hidden sm:inline capitalize">{season}</span>
                </button>
              ))}
            </div>
          </Fade>
        </div>

        <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img 
                src={seasonalData[activeTab].image} 
                alt={`${activeTab} gardening`} 
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-6 md:p-8">
              <Fade key={activeTab} triggerOnce>
                <div className="flex items-center mb-4">
                  {seasonalData[activeTab].icon}
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white ml-3">
                    {seasonalData[activeTab].title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {seasonalData[activeTab].description}
                </p>
                <h4 className="font-bold text-lg text-gray-700 dark:text-white mb-3">Seasonal Tasks:</h4>
                <ul className="space-y-2">
                  {seasonalData[activeTab].tasks.map((task, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-600 dark:text-gray-300">{task}</span>
                    </li>
                  ))}
                </ul>
              </Fade>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeasonalGuide;