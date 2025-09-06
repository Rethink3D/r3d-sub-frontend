import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface Slide {
  id: number;
  image: string;
  title: string;
}

const slidesData: Slide[] = [
  {
    id: 1,
    image: "/fotoevento10.jpg",
    title: "Transformar Juntos 2025.",
  },
  {
    id: 3,
    image: "/fazteunomeevento5.jpg",
    title: "Neon 2025",
  },
  {
    id: 2,
    image: "/fotoevento1.jpg",
    title: "Faz teu nome!",
  },
  {
    id: 4,
    image: "/fotoevento5.jpg",
    title: "Neon 2025",
  },
  {
    id: 5,
    image: "/eventofazteunomepedro.jpg",
    title: "Faz teu nome!",
  },
];
const CredibilityCarousel: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 text-center">
      <h2 className="text-4xl md:text-5xl font-bold text-texto-principal mb-12">
        Galeria de Eventos:
      </h2>

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 100,
          depth: 100,
          modifier: 2.5,
          slideShadows: true,
        }}
        pagination={{
          el: ".swiper-pagination",
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} w-2.5 h-2.5 rounded-full 
        bg-gray-800 dark:bg-white opacity-50 
        [&.swiper-pagination-bullet-active]:bg-blue-500 
        [&.swiper-pagination-bullet-active]:opacity-100"></span>`;
          },
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="w-full mb-5"
      >
        {slidesData.map((slide) => (
          <SwiperSlide
            key={slide.id}
            className="!w-[100%] sm:!w-[85%] lg:!w-[70%]"
          >
            {({ isActive }) => (
              <div
                className={`relative w-full aspect-video rounded-2xl overflow-hidden transition-all duration-500 ease-in-out transform ${
                  isActive ? "shadow-2xl" : "opacity-40 scale-90"
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 sm:p-6 text-left text-white">
                  <h3 className="text-lg sm:text-2xl font-bold">
                    {slide.title}
                  </h3>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}

        <div className="slider-controler relative mt-8">
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </div>
  );
};

export default CredibilityCarousel;
