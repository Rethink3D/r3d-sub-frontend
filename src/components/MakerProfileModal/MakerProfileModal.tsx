import React from 'react';
import styles from './MakerProfileModal.module.css';
const CloseIcon = () => (<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path></svg>);
const LocationIcon = () => (<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>);
const StarIcon = () => (<svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>);
const ExternalLinkIcon = () => (<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>);

const mockMaker = {
    name: "Ana Souza",
    location: "São Paulo, SP",
    rating: 4.9,
    productCount: 45,
    bio: "Designer especializada em objetos decorativos únicos com mais de 5 anos de experiência.",
    tags: ["Decoração", "Design de Interiores", "Arte Moderna"],
    featuredProduct: {
        imageUrl: "https://placehold.co/100x100/313131/FFF?text=Vaso",
        title: "Vaso Geométrico",
        description: "Decoração criado com alta qualidade e atenção aos detalhes.",
        price: "45.90"
    },
    contacts: {
        instagram: "ana.souza.3d",
        whatsapp: "5511912345678",
        email: "ana.souza@email.com",
        mercadoLivre: "#"
    }
};

interface MakerProfileModalProps {
  maker: any;
  onClose: () => void;
}

const MakerProfileModal: React.FC<MakerProfileModalProps> = ({ maker = mockMaker, onClose }) => {
  const handleModalContentClick = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div onClick={onClose} className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div 
        onClick={handleModalContentClick}
        className="relative bg-white dark:bg-[#121212] text-gray-900 dark:text-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 animate-fade-in-scale"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors">
          <CloseIcon />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-6 mb-4">
              <div className={`${styles.avatarRing} p-1`}>
                <img src={maker.avatarUrl || `https://ui-avatars.com/api/?name=${maker.name.replace(' ', '+')}&background=random`} alt={maker.name} className="w-24 h-24 rounded-full" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{maker.name}</h1>
                <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 text-sm mt-1">
                  <span className="flex items-center gap-1"><LocationIcon /> {maker.location}</span>
                  <span className="flex items-center gap-1"><StarIcon /> {maker.rating} • {maker.productCount} produtos</span>
                </div>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{maker.bio}</p>
            <div className="flex flex-wrap gap-2">
              {maker.tags.map((tag: string) => (
                <span key={tag} className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 text-xs font-semibold px-3 py-1 rounded-full">{tag}</span>
              ))}
            </div>
          </div>

          <div className="bg-gray-100 dark:bg-black/30 rounded-lg p-6">
            <h2 className="font-bold text-xl mb-4">Produto em Destaque</h2>
            <div className="flex items-center gap-4">
              <img src={maker.featuredProduct.imageUrl} alt={maker.featuredProduct.title} className="w-24 h-24 rounded-md object-cover" />
              <div>
                <h3 className="font-bold text-lg text-blue-600 dark:text-blue-400">{maker.featuredProduct.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{maker.featuredProduct.description}</p>
                <p className="font-bold text-lg mt-1">R$ {maker.featuredProduct.price}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-bold mb-4">Entre em Contato</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a href="#" className={`${styles.contactCard} flex justify-between items-center p-4 rounded-lg`}>
              <div>
                <p className="font-bold">Instagram</p>
                <p className="text-sm">Ver perfil</p>
              </div>
              <ExternalLinkIcon />
            </a>
            <a href="#" className={`${styles.contactCard} flex justify-between items-center p-4 rounded-lg`}>
              <div>
                <p className="font-bold">Mercado Livre</p>
                <p className="text-sm">Ver loja</p>
              </div>
              <ExternalLinkIcon />
            </a>
            <a href="#" className={`${styles.contactCard} flex justify-between items-center p-4 rounded-lg`}>
              <div>
                <p className="font-bold">WhatsApp</p>
                <p className="text-sm">Conversar agora</p>
              </div>
              <ExternalLinkIcon />
            </a>
            <a href="#" className={`${styles.contactCard} flex justify-between items-center p-4 rounded-lg`}>
              <div>
                <p className="font-bold">Email</p>
                <p className="text-sm">Enviar mensagem</p>
              </div>
              <ExternalLinkIcon />
            </a>
          </div>
        </div>
        
        <div className="mt-10 text-center">
            <button>
                Ver Todos os Produtos 
            </button>
        </div>

      </div>
    </div>
  );
};

export default MakerProfileModal;
