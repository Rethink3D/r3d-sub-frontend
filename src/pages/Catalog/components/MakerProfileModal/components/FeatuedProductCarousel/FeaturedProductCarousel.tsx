import { useState, useRef, useEffect, useMemo } from "react";
import { Product, ProductTypeEnum } from "../../../../../../types/types";
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
import { CAMPAIGN_CONFIG } from "../../../../../../config/campaign";

interface FeaturedProductCarouselProps {
  product: Product;
}

const FeaturedProductCarousel: React.FC<FeaturedProductCarouselProps> = ({
  product,
}) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);
  const scrollPositionRef = useRef(0);

  const isPromotional = product.type === ProductTypeEnum.PROMOTIONAL;
  const isLongDescription =
    product.description && product.description.length > 100;

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

  const finalPrice = useMemo(() => {
    const originalPrice = parseFloat(product.price);
    if (isNaN(originalPrice)) return "0.00";

    if (product.discountPercentage && product.discountPercentage > 0) {
      const discount = originalPrice * (product.discountPercentage / 100);
      return (originalPrice - discount).toFixed(2);
    }
    return originalPrice.toFixed(2);
  }, [product.price, product.discountPercentage]);

  if (!product.images || product.images.length === 0) {
    return <p>Este produto não possui imagens.</p>;
  }

  return (
    <>
      <div className="flex flex-col h-full w-full bg-gray-50 dark:bg-white/5 p-4 rounded-xl">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3">
          Produto em Destaque
        </h3>

        <div className="relative rounded-lg overflow-hidden shadow-sm flex-shrink-0">
          {isPromotional && (
            <div
              className={`absolute top-0 left-0 z-30 px-3 py-1 rounded-br-lg text-xs font-bold uppercase tracking-wide shadow-md ${CAMPAIGN_CONFIG.badgeColor}`}
            >
              {CAMPAIGN_CONFIG.label}
            </div>
          )}

          {product.discountPercentage && product.discountPercentage > 0 && (
            <div className="absolute top-0 right-0 z-30 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-bl-lg shadow-md">
              -{product.discountPercentage}%
            </div>
          )}

          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onClick={handleLightboxOpen}
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={10}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              el: ".swiper-pagination-featured",
              clickable: true,
              renderBullet: (index, className) => {
                return `<span class="${className} w-2 h-2 rounded-full bg-white opacity-50 transition-all duration-300 [&.swiper-pagination-bullet-active]:bg-white [&.swiper-pagination-bullet-active]:opacity-100 [&.swiper-pagination-bullet-active]:w-4 [&.swiper-pagination-bullet-active]:rounded-md"></span>`;
              },
            }}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            className="w-full aspect-square bg-black cursor-pointer"
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

          <button className="swiper-button-prev-custom hidden md:flex items-center justify-center absolute top-1/2 -translate-y-1/2 left-2 z-20 w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 transition-colors duration-300">
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <button className="swiper-button-next-custom hidden md:flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-2 z-20 w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 transition-colors duration-300">
            <ArrowRightIcon className="w-5 h-5" />
          </button>

          <div className="swiper-pagination-featured absolute bottom-2 left-0 w-full flex justify-center items-center space-x-1 z-20"></div>
        </div>

        <div className="mt-4 flex flex-col flex-grow">
          <h3 className="font-bold text-lg text-purple-700 dark:text-purple-400 leading-tight mb-1 break-words">
            {product.name}
          </h3>

          <div className="relative">
            <p
              className={`text-sm text-gray-600 dark:text-gray-300 break-all whitespace-pre-wrap ${
                !isDescriptionExpanded ? "line-clamp-2" : ""
              }`}
            >
              {product.description}
            </p>
            {isLongDescription && (
              <button
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className="text-xs font-semibold text-gray-500 hover:text-purple-600 mt-1 underline decoration-dotted"
              >
                {isDescriptionExpanded ? "Ver menos" : "Ver mais"}
              </button>
            )}
          </div>

          <div className="flex justify-between items-end mt-4 pt-2 border-t border-gray-200 dark:border-gray-700">
            {product.isPersonalizable ? (
              <div className="flex items-center gap-1.5 bg-purple-500 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full">
                <WandIcon className="w-3 h-3" />
                <span>Personalizável</span>
              </div>
            ) : (
              <span />
            )}

            <div className="text-right">
              {product.discountPercentage && product.discountPercentage > 0 ? (
                <>
                  <span className="text-xs text-gray-400 block line-through">
                    De R${parseFloat(product.price).toFixed(2)}
                  </span>
                  <p className="font-bold text-xl text-green-600 dark:text-green-400">
                    A partir de R$ {finalPrice}
                  </p>
                </>
              ) : (
                <p className="font-bold text-xl text-gray-900 dark:text-white">
                  R$ {product.price}
                </p>
              )}
            </div>
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
