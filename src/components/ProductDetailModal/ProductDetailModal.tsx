import React from 'react';
import MakerCard from './../MakerCard/MakerCard';

// Ícones
const CloseIcon = () => (<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path></svg>);
const WandIcon = () => (
  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
  </svg>
);

interface ProductDetailModalProps {
  product: any;
  onClose: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const handleModalContentClick = (e: React.MouseEvent) => e.stopPropagation();

  if (!product) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4"
    >
      {/* APLICAÇÃO DA ANIMAÇÃO AQUI */}
      <div className="relative w-full max-w-6xl h-full max-h-[90vh] animate-fade-in-scale" onClick={handleModalContentClick}>
        
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 p-2 text-gray-400 hover:text-gray-800 hover:scale-110 transition-all z-20"
        >
          <CloseIcon />
        </button>

        <div className="bg-white text-gray-900 rounded-lg shadow-xl w-full h-full flex overflow-hidden">
          <div className="w-full flex flex-col md:flex-row h-full">
            <div className="w-full md:w-2/3 p-8 overflow-y-auto">
              <div className="bg-gray-100 rounded-lg p-4 mb-6">
                <img src={product.imageUrl} alt={product.title} className="w-full h-80 object-contain" />
              </div>
              <h1 className="text-3xl font-bold mb-4 text-gray-900">{product.title}</h1>
              <p className="text-3xl font-light mb-6 text-gray-800">R$ {product.price}</p>
              
              {/* BOTÕES COM TAMANHO CORRIGIDO */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity">
                  Comprar agora
                </button>
                {product.isCustomizable && (
                  <button className="flex-1 flex items-center justify-center gap-2 bg-transparent text-blue-500 font-semibold py-3 px-6 rounded-lg border-2 border-blue-500 hover:bg-blue-50 transition-colors">
                    <WandIcon />
                    Solicitar Personalização
                  </button>
                )}
              </div>

              <div>
                <h2 className="text-2xl font-bold border-b border-gray-200 pb-2 mb-4">Detalhes</h2>
                <ul className="text-gray-600 leading-relaxed space-y-2">
                  <li>{product.description}</li>
                  {product.width && product.height && (
                    <li className="text-sm text-gray-500">Dimensões: {product.width} x {product.height}</li>
                  )}
                </ul>
              </div>
            </div>

            <div className="w-full md:w-1/3 p-6 bg-gray-50 overflow-y-auto">
              {product.maker && <MakerCard maker={product.maker} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
