import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { Fade } from 'react-awesome-reveal';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const HeroSlider = () => {
  const { currentUser } = useAuth();

  const slides = [
    {
      id: 1,
      title: "Grow Together",
      subtitle: "Join our community of garden enthusiasts and share your knowledge",
      image: "https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      buttonText: currentUser ? "Share a Tip" : "Join Now",
      buttonLink: currentUser ? "/share-tip" : "/register"
    },
    {
      id: 2,
      title: "Urban Gardening Made Simple",
      subtitle: "Learn how to create beautiful gardens in small spaces",
      image: "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      buttonText: "Explore Tips",
      buttonLink: "/browse-tips"
    },
    {
      id: 3,
      title: "Your Green Journey Starts Here",
      subtitle: "Discover expert advice from our community of gardeners",
      image: "https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      buttonText: "Meet Gardeners",
      buttonLink: "/explore-gardeners"
    }
  ];

  return (
    <div className="relative">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        effect="fade"
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className="h-[500px] md:h-[600px] rounded-lg overflow-hidden"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div 
              className="relative w-full h-full flex items-center justify-center"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              <div className="container z-10 text-center px-4">
                <Fade direction="up" cascade triggerOnce>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto">
                    {slide.subtitle}
                  </p>
                  <Link 
                    to={slide.buttonLink} 
                    className="btn btn-primary py-3 px-8 text-lg"
                  >
                    {slide.buttonText}
                  </Link>
                </Fade>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;