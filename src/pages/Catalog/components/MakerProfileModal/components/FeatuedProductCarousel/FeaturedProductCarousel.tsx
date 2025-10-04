import { useState, useRef, useEffect } from "react";
import { Product } from "../../../../../../types/types";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import {
  WandIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "../../../../../../components/CarouselIcons/Icons";
import ProductLightbox from "./ProductLightBox";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface FeaturedProductCarouselProps {
  product: Product;
}

const FeaturedProductCarousel: React.FC<FeaturedProductCarouselProps> = ({
  product,
}) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const scrollPositionRef = useRef(0);

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
    const modalContainer = document.getElementById(
      "maker-modal-scroll-container"
    );
    if (!modalContainer) return;

    if (lightboxIndex !== null) {
      scrollPositionRef.current = modalContainer.scrollTop;
      modalContainer.style.overflow = "hidden";
      modalContainer.scrollTo({ top: 0, behavior: "auto" });
    }

    return () => {
      modalContainer.style.overflow = "auto";
      if (lightboxIndex !== null) {
        modalContainer.scrollTo({
          top: scrollPositionRef.current,
          behavior: "auto",
        });
      }
    };
  }, [lightboxIndex]);

  if (!product.images || product.images.length === 0) {
    return <p>Este produto não possui imagens.</p>;
  }

  return (
    <>
      <div className="flex flex-col h-full w-full">
        <div>
          <div className="relative">
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onClick={handleLightboxOpen}
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={10}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                el: ".swiper-pagination-featured",
                clickable: true,
                renderBullet: (index, className) => {
                  return `<span class="${className} w-3 h-3 rounded-full bg-gray-400 dark:bg-gray-600 opacity-75 transition-all duration-300 [&.swiper-pagination-bullet-active]:bg-blue-500 dark:[&.swiper-pagination-bullet-active]:bg-blue-500 [&.swiper-pagination-bullet-active]:opacity-100 [&.swiper-pagination-bullet-active]:w-5 [&.swiper-pagination-bullet-active]:rounded-md"></span>`;
                },
              }}
              navigation={{
                nextEl: ".swiper-button-next-custom",
                prevEl: ".swiper-button-prev-custom",
              }}
              className="w-full h-48 rounded-lg bg-gray-200 dark:bg-gray-800 cursor-pointer"
            >
              {product.images.map((image) => (
                <SwiperSlide key={image.id}>
                  <img
                    src={image.urlThumbnail || image.urlDisplay}
                    alt={image.altText || product.name}
                    className="w-full h-full object-contain"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <button className="swiper-button-prev-custom hidden md:flex items-center justify-center absolute top-1/2 -translate-y-1/2 left-2 z-20 w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 transition-colors duration-300">
              <ArrowLeftIcon className="w-5 h-5" />
            </button>
            <button className="swiper-button-next-custom hidden md:flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-2 z-20 w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 transition-colors duration-300">
              <ArrowRightIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="swiper-pagination-featured flex justify-center items-center space-x-2 mt-4"></div>
        </div>

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
                  <WandIcon /> <span>Personalizável</span>
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
      </div>

      {lightboxIndex !== null && (
        <ProductLightbox
          images={product.images}
          productName={product.name}
          startIndex={lightboxIndex}
          onClose={handleLightboxClose}
        />
      )}
    </>
  );
};

export default FeaturedProductCarousel;
