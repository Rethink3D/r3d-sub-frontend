import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

interface Slide {
  id: number;
  image: string;
  title: string;
}

const slidesData: Slide[] = [
  { id: 1, image: "/fotoevento10.jpg", title: "Transformar Juntos 2025." },
  { id: 3, image: "/fazteunomeevento5.jpg", title: "Neon 2025" },
  { id: 2, image: "/fotoevento1.jpg", title: "Faz teu nome!" },
  { id: 4, image: "/fotoevento5.jpg", title: "Neon 2025" },
  { id: 5, image: "/eventofazteunomepedro.jpg", title: "Faz teu nome!" },
];

const CredibilityCarousel: React.FC = () => {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const scrollPositionRef = useRef(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const handleLightboxOpen = (imageUrl: string) => {
    setLightboxImage(imageUrl);
    swiperRef.current?.autoplay.stop();
  };

  const handleLightboxClose = () => {
    setLightboxImage(null);
    swiperRef.current?.autoplay.start();
  };

  const handleSlideClick = (swiper: SwiperType) => {
    const activeImage = slidesData[swiper.realIndex];
    if (activeImage) {
      handleLightboxOpen(activeImage.image);
    }
  };

  useEffect(() => {
    const scrollContainer = document.getElementById("main-scroll-container");
    if (!scrollContainer) {
      console.warn(
        "Container de scroll #main-scroll-container não encontrado."
      );
      return;
    }

    if (lightboxImage) {
      scrollPositionRef.current = scrollContainer.scrollTop;
      scrollContainer.style.overflow = "hidden";
    }

    return () => {
      scrollContainer.style.overflow = "auto";
      if (lightboxImage) {
        scrollContainer.scrollTo({
          top: scrollPositionRef.current,
          behavior: "auto",
        });
      }
    };
  }, [lightboxImage]);

  return (
    <div className="max-w-7xl mx-auto px-4 text-center">
      <h2 className="text-4xl md:text-5xl font-bold text-texto-principal mb-12">
        Galeria de Eventos:
      </h2>

      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onClick={handleSlideClick}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
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
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        className="w-full mb-5"
      >
        {slidesData.map((slide) => (
          <SwiperSlide
            key={slide.id}
            className="!w-[100%] sm:!w-[85%] lg:!w-[70%]"
          >
            {({ isActive }) => (
              <div
                className={`relative w-full aspect-video rounded-2xl overflow-hidden transition-all duration-500 ease-in-out transform cursor-pointer ${
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

      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4 animate-fade-in"
          onClick={handleLightboxClose}
        >
          <button className="absolute top-5 right-5 text-white z-10 hover:opacity-75 transition-opacity">
            <CloseIcon className="w-8 h-8" />
          </button>
          <img
            src={lightboxImage}
            alt="Imagem ampliada"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default CredibilityCarousel;
