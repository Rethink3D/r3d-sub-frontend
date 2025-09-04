import React from 'react';

// 1. Importe os componentes e módulos do Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

// 2. Importe os estilos do Swiper
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Interface (continua a mesma)
interface Slide {
  id: number;
  image: string;
  title: string;
  description: string;
}

// 3. ATUALIZE AQUI com o caminho para as SUAS imagens
const slidesData: Slide[] = [
  {
    id: 1,
    // CORREÇÃO IMPORTANTE: O caminho correto para arquivos na pasta /public não inclui "/public"
    image: "/fotoevento10.jpg",
    title: "Evento de Lançamento da Plataforma",
    description: "Participamos da feira de tecnologia local, apresentando a Rethink3D.",
  },
  {
    id: 2,
    image: "/fotoevento1.jpg",
    title: "Parceria com Indústria de Protótipos",
    description: "Fechamos um contrato de grande escala para fornecer protótipos rápidos.",
  },
  {
    id: 3,
    image: "/fotoevento8.jpg",
    title: "Projeto de Peças Customizadas",
    description: "Desenvolvemos e entregamos um lote de 1.000 peças customizadas.",
  },
  {
    id: 4,
    image: "/fotoevento5.jpg",
    title: "Outro Grande Contrato",
    description: "Mais um exemplo de negócio bem sucedido para mostrar no carrossel.",
  },
];

const CredibilityCarousel: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 text-center">
      <h2 className="text-5xl font-bold text-texto-principal mb-12">
        Nossa Trajetória de Sucesso
      </h2>

      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          // ALTERAÇÃO 1: Aumentamos o 'stretch' para criar mais espaço entre os slides
          stretch: 100, 
          depth: 100,
          modifier: 2.5,
          slideShadows: true,
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        // ALTERAÇÃO 2: Adicionei mais espaçamento vertical (my-12) para o carrossel respirar
        className="w-full py-4 my-12"
      >
        {slidesData.map((slide) => (
          // ALTERAÇÃO 3: Aumentamos a largura dos slides para que ocupem mais a tela
          <SwiperSlide key={slide.id} className="!w-[100%] sm:!w-[85%] lg:!w-[70%]">
            {({ isActive }) => (
              <div
                className={`relative w-full aspect-video rounded-2xl overflow-hidden transition-all duration-500 ease-in-out transform ${
                  isActive ? 'shadow-2xl' : 'opacity-40 scale-90'
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 sm:p-6 text-left text-white">
                  <h3 className="text-lg sm:text-2xl font-bold">{slide.title}</h3>
                  <p className="hidden sm:block text-sm sm:text-base text-gray-200 mt-1">{slide.description}</p>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}

        {/* Controles de Navegação e Paginação */}
        <div className="slider-controler relative mt-8">
            <div className="swiper-button-prev slider-arrow text-white bg-black/30 rounded-full after:!text-xl"></div>
            <div className="swiper-button-next slider-arrow text-white bg-black/30 rounded-full after:!text-xl"></div>
            <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </div>
  );
};

export default CredibilityCarousel;