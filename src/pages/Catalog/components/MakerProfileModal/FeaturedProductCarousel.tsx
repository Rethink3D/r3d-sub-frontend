import React, { useState, useEffect, useRef } from "react";
import { Product } from "../../../../types/types";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, Pagination } from "swiper/modules";
import { CloseIcon, WandIcon } from "../Icons";
import "swiper/css";
import "swiper/css/pagination";

interface FeaturedProductCarouselProps {
  product: Product;
}

const FeaturedProductCarousel: React.FC<FeaturedProductCarouselProps> = ({
  product,
}) => {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const scrollPositionRef = useRef(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const handleLightboxOpen = (url: string) => {
    setLightboxImage(url);
    swiperRef.current?.autoplay.stop();
  };

  const handleLightboxClose = () => {
    setLightboxImage(null);
    swiperRef.current?.autoplay.start();
  };

  const handleSlideClick = (swiper: SwiperType) => {
    const activeImage = product.images[swiper.realIndex];
    if (activeImage) {
      handleLightboxOpen(activeImage.url);
    }
  };

  useEffect(() => {
    const modalContainer = document.getElementById(
      "maker-modal-scroll-container"
    );
    if (!modalContainer) return;

    if (lightboxImage) {
      scrollPositionRef.current = modalContainer.scrollTop;
      modalContainer.style.overflow = "hidden";
      modalContainer.scrollTo({ top: 0, behavior: "auto" });
    }

    return () => {
      modalContainer.style.overflow = "auto";
      if (lightboxImage) {
        modalContainer.scrollTo({
          top: scrollPositionRef.current,
          behavior: "auto",
        });
      }
    };
  }, [lightboxImage]);

  if (!product.images || product.images.length === 0) {
    return <p>Este produto não possui imagens.</p>;
  }

  return (
    <div className="flex flex-col h-full w-full">
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onClick={handleSlideClick}
        className="featured-product-swiper h-48 w-full rounded-lg bg-gray-200 dark:bg-gray-800 cursor-pointer"
        modules={[Autoplay, Pagination]}
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
      >
        {product.images.map((image) => (
          <SwiperSlide key={image.id}>
            <img
              src={image.url}
              alt={image.altText || product.name}
              className="w-full h-full object-contain"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="text-center sm:text-left mt-4 flex flex-col flex-grow">
        <h3 className="font-bold text-lg text-blue-600 dark:text-blue-400">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1 flex-grow">
          {product.description}
        </p>

        <div className="flex justify-between items-end mt-4">
          {product.isPersonalizable && (
            <div tabIndex={0} className="group relative">
              <div className="flex items-center gap-1.5 bg-purple-600/80 text-white text-xs font-semibold px-2 py-1 rounded-full cursor-pointer">
                <WandIcon /> <span>Customizável</span>
              </div>
              <div className="absolute z-10 bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 text-center bg-gray-900 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity pointer-events-none">
                Este produto pode ser personalizado!
              </div>
            </div>
          )}

          <p className="font-bold text-lg text-right ml-auto">
            R$ {product.price}
          </p>
        </div>
      </div>

      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4"
          onClick={handleLightboxClose}
        >
          <button className="absolute top-5 right-5 text-white z-10">
            <CloseIcon className="w-8 h-8" />
          </button>
          <img
            src={lightboxImage}
            alt="Imagem em destaque ampliada"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default FeaturedProductCarousel;
