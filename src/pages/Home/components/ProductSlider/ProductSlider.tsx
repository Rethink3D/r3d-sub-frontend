import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import roboBranco from "/icone-1.png";
import roboColorido from "/icone-2.png";
import roboPensante from "/icone-3.png";
import TypeCard from "../TypeCard";

interface ProductTypeData {
  image: string;
  title: string;
  definition: string;
  examples: string;
}

const productTypesData: ProductTypeData[] = [
  {
    image: roboBranco,
    title: "Produto Fixo",
    definition:
      "Produto pronto, de catálogo padrão, com alterações mínimas ou inexistentes.",
    examples: "Exemplos: Miniatura já definida, chaveiro de um personagem.",
  },
  {
    image: roboColorido,
    title: "Produto Personalizável",
    definition:
      "Produto existente que aceita ajustes, como cor, tamanho, nome ou logotipo.",
    examples:
      "Exemplos: Chaveiro com o logo da empresa, caneca com nome gravado.",
  },
  {
    image: roboPensante,
    title: "Produto Sob Demanda",
    definition:
      "Projeto único e criado do zero, que envolve estudo e prototipagem.",
    examples:
      "Exemplos: Gadget inventado pelo cliente, peça de reposição exclusiva.",
  },
];

const ProductTypes: React.FC = () => {
  return (
    <div className="mx-auto mt-8 max-w-7xl px-4 font-sans">
      <div className="relative">
        <Swiper
          modules={[Autoplay, Pagination]}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
          }}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class="${className} w-3 h-3 rounded-full bg-gray-400 dark:bg-gray-600 opacity-75 transition-all duration-300 [&.swiper-pagination-bullet-active]:bg-blue-500 dark:[&.swiper-pagination-bullet-active]:bg-blue-500 [&.swiper-pagination-bullet-active]:opacity-100 [&.swiper-pagination-bullet-active]:w-5 [&.swiper-pagination-bullet-active]:rounded-md"></span>`;
            },
          }}
          slidesPerView={1}
          spaceBetween={30}
          className="w-full pb-12 md:pb-16"
          breakpoints={{
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
              autoplay: false,
              loop: false,
              allowTouchMove: false,
            },
          }}
        >
          {productTypesData.map((type) => (
            <SwiperSlide key={type.title} className="h-auto">
              <TypeCard
                image={type.image}
                title={type.title}
                definition={type.definition}
                examples={type.examples}
              />
            </SwiperSlide>
          ))}

          <div className="swiper-pagination absolute bottom-6 left-0 w-full flex justify-center items-center space-x-2 z-10"></div>
        </Swiper>
      </div>
    </div>
  );
};

export default ProductTypes;
