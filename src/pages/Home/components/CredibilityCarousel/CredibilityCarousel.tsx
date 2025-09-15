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
import { ArrowLeftIcon, ArrowRightIcon } from "../../../../components/CarouselIcons/Icons";
import Lightbox from "./LightBox";

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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  const handleLightboxOpen = (swiper: SwiperType, event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (
      target.closest(".swiper-button-next-custom") ||
      target.closest(".swiper-button-prev-custom")
    ) {
      return;
    }
    setLightboxIndex(swiper.realIndex);
    swiper.autoplay.stop();
  };

  const handleLightboxClose = () => {
    setLightboxIndex(null);
    swiperRef.current?.autoplay.start();
  };

  useEffect(() => {
    const body = document.body;
    if (lightboxIndex !== null) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
    return () => {
      body.style.overflow = "auto";
    };
  }, [lightboxIndex]);

  return (
    <div className="max-w-7xl mx-auto px-4 text-center">
      <h2 className="text-4xl md:text-5xl font-bold text-texto-principal mb-8 md:mb-12">
        Galeria de Eventos:
      </h2>
      <div className="relative">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onClick={handleLightboxOpen}
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
              return `<span class="${className} w-3 h-3 rounded-full bg-gray-400 dark:bg-gray-600 opacity-75 transition-all duration-300 [&.swiper-pagination-bullet-active]:bg-blue-500 dark:[&.swiper-pagination-bullet-active]:bg-blue-500 [&.swiper-pagination-bullet-active]:opacity-100 [&.swiper-pagination-bullet-active]:w-5 [&.swiper-pagination-bullet-active]:rounded-md"></span>`;
            },
          }}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          className="w-full pb-12 md:pb-16"
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
          <div className="swiper-pagination absolute bottom-6 left-0 w-full flex justify-center items-center space-x-2 z-10"></div>
        </Swiper>
        <button className="swiper-button-prev-custom hidden md:flex items-center justify-center absolute top-1/2 -translate-y-1/2 -mt-6 md:-mt-8 left-0 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors duration-300">
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <button className="swiper-button-next-custom hidden md:flex items-center justify-center absolute top-1/2 -translate-y-1/2 -mt-6 md:-mt-8 right-0 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors duration-300">
          <ArrowRightIcon className="w-6 h-6" />
        </button>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          slides={slidesData}
          startIndex={lightboxIndex}
          onClose={handleLightboxClose}
        />
      )}
    </div>
  );
};

export default CredibilityCarousel;
