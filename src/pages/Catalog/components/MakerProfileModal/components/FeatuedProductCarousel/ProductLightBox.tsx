import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import { Image } from "../../../../../../types/types";
import {
  CloseIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "../../../../../../components/CarouselIcons/Icons";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

interface LightboxProps {
  images: Image[];
  productName: string;
  startIndex: number;
  onClose: () => void;
}

const ProductLightbox: React.FC<LightboxProps> = ({
  images,
  productName,
  startIndex,
  onClose,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") swiperRef.current?.slideNext();
      if (e.key === "ArrowLeft") swiperRef.current?.slidePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/95 z-[9999] flex flex-col items-center justify-center animate-fade-in">
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-white z-20 hover:opacity-75 transition-opacity"
        aria-label="Fechar"
      >
        <CloseIcon className="w-8 h-8" />
      </button>

      <div className="w-full h-full flex flex-col justify-center items-center p-4">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Navigation, Thumbs]}
          loop={true}
          initialSlide={startIndex}
          navigation={{
            nextEl: ".lightbox-button-next",
            prevEl: ".lightbox-button-prev",
          }}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          className="w-full h-[calc(100%-120px)]"
        >
          {images.map((image) => (
            <SwiperSlide key={image.id}>
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src={image.urlDisplay || image.urlThumbnail}
                  alt={image.altText || productName}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
          <button
            className="lightbox-button-prev absolute left-2 md:left-5 top-1/2 -translate-y-1/2 text-white z-20 bg-black/30 p-2 rounded-full hover:bg-black/50 transition-colors hidden md:flex"
            aria-label="Imagem anterior"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <button
            className="lightbox-button-next absolute right-2 md:right-5 top-1/2 -translate-y-1/2 text-white z-20 bg-black/30 p-2 rounded-full hover:bg-black/50 transition-colors hidden md:flex"
            aria-label="Próxima imagem"
          >
            <ArrowRightIcon className="w-6 h-6" />
          </button>
        </Swiper>

        <Swiper
          onSwiper={setThumbsSwiper}
          modules={[Thumbs, FreeMode]}
          watchSlidesProgress
          slidesPerView={"auto"}
          spaceBetween={8}
          freeMode={true}
          className="w-full max-w-2xl h-[80px] mt-4"
        >
          {images.map((image) => (
            <SwiperSlide
              key={image.id}
              className="!w-24 h-full rounded-md overflow-hidden cursor-pointer opacity-50 transition-opacity [&.swiper-slide-thumb-active]:opacity-100 [&.swiper-slide-thumb-active]:border-2 [&.swiper-slide-thumb-active]:border-white"
            >
              <img
                src={image.urlThumbnail || image.urlDisplay}
                alt={image.altText || productName}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductLightbox;
