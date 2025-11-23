const PromotionalBanner: React.FC = () => {
  return (
    <div className="w-full mb-6 overflow-hidden rounded-lg">
      <picture>
        <source
          media="(max-width: 768px)"
          srcSet="/promotional/BlackFridayBannerMobile.webp"
        />
        <img
          src="/promotional/BlackFridayBanner.webp"
          alt="Black Friday Promocional"
          className="w-full h-auto object-contain"
        />
      </picture>
    </div>
  );
};

export default PromotionalBanner;
