import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { EffectCoverflow, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { Product } from "../../../../types/types";
import ProductCard from "../../../../components/ProductCard/ProductCard";
import styles from "./ProductShowcase.module.css";
import HomeSearch from "./HomeSearch";

const ChevronLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-8 h-8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 19.5L8.25 12l7.5-7.5"
    />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-8 h-8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 4.5l7.5 7.5-7.5 7.5"
    />
  </svg>
);

interface ProductShowcaseProps {
  products: Product[];
  isLoading: boolean;
  onSearch: (searchTerm: string) => void;
}

const ProductShowcase: React.FC<ProductShowcaseProps> = ({
  products,
  isLoading,
  onSearch,
}) => {
  if (isLoading) {
    return (
      <div
        className={`w-full max-w-[30rem] aspect-square ${styles.placeholder}`}
      />
    );
  }

  if (products.length < 3) {
    return null;
  }

  return (
    <div className={styles.showcaseContainer}>
      <button
        className={`swiper-button-prev-showcase ${styles.navButton} ${styles.navButtonPrev}`}
      >
        <ChevronLeftIcon />
      </button>

      <div className={styles.carouselWrapper}>
        <div className="w-full px-4 mb-4">
          <HomeSearch onSearch={onSearch} />
        </div>

        <Swiper
          modules={[EffectCoverflow, Navigation, Autoplay]}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            prevEl: ".swiper-button-prev-showcase",
            nextEl: ".swiper-button-next-showcase",
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 200,
            modifier: 1.5,
            slideShadows: false,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1.5,
              spaceBetween: 0,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: -80,
            },
            1024: {
              effect: "slide",
              slidesPerView: 3,
              spaceBetween: 20,
              centeredSlides: false,
            },
          }}
          className={styles.swiperContainer}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} className={styles.swiperSlide}>
              <Link
                to={`/catalogo/produto/${product.id}`}
                className="flex h-full w-full"
              >
                <ProductCard
                  title={product.name}
                  description={product.description}
                  price={product.price}
                  imageUrl={
                    product.images[0]?.url || "https://via.placeholder.com/300"
                  }
                  isCustomizable={product.isPersonalizable}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <button
        className={`swiper-button-next-showcase ${styles.navButton} ${styles.navButtonNext}`}
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
};

export default ProductShowcase;
