import { useState, useEffect, useCallback } from "react";
import { CloseIcon, ArrowLeftIcon, ArrowRightIcon } from "../../../../components/CarouselIcons/Icons";

interface Slide {
  id: number;
  image: string;
  title: string;
}

interface LightboxProps {
  slides: Slide[];
  startIndex: number;
  onClose: () => void;
}

const LightBox: React.FC<LightboxProps> = ({ slides, startIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, [slides.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  }, [slides.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, handleNext, handlePrev]);

  return (
    <div className="fixed inset-0 bg-black/90 z-[9999] flex flex-col items-center justify-center p-4 animate-fade-in">
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-white z-20 hover:opacity-75 transition-opacity"
        aria-label="Fechar"
      >
        <CloseIcon className="w-8 h-8" />
      </button>

      <div className="relative w-full h-full flex items-center justify-center">
        <button
          onClick={handlePrev}
          className="absolute left-2 md:left-5 text-white z-20 bg-black/30 p-2 rounded-full hover:bg-black/50 transition-colors hidden md:block"
          aria-label="Imagem anterior"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>

        <div className="w-full h-[calc(100%-120px)] flex items-center justify-center">
          <img
            src={slides[currentIndex].image}
            alt={slides[currentIndex].title}
            className="max-w-full max-h-full object-contain"
          />
        </div>

        <button
          onClick={handleNext}
          className="absolute right-2 md:right-5 text-white z-20 bg-black/30 p-2 rounded-full hover:bg-black/50 transition-colors hidden md:block"
          aria-label="Próxima imagem"
        >
          <ArrowRightIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex justify-center space-x-2 overflow-x-auto pb-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setCurrentIndex(index)}
              className={`w-20 h-12 flex-shrink-0 rounded-md overflow-hidden transition-all duration-300 ${
                index === currentIndex
                  ? "border-2 border-white opacity-100"
                  : "opacity-50 hover:opacity-80"
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LightBox;
