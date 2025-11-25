import { useNavigate } from "react-router-dom";

const PromotionalBanner: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="w-full mb-6 overflow-hidden rounded-lg cursor-pointer"
      onClick={() => navigate("/catalogo")}
    >
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
