import styles from "./Home.module.css";
import InviteForm from "./components/InviteForm/InviteForm";
import { Link } from "react-router-dom";
import CredibilityCarousel from "./components/CredibilityCarousel/CredibilityCarousel";
import FaqAccordion from "../../components/Faq/FaqAccordion";
import ScrollToHash from "../../components/ScrollToHash/ScrollToHash";

const HomePage: React.FC = () => {
  return (
    <div className="py-8 md:py-20 flex flex-col md:gap-24">
      <ScrollToHash />
      <section className="grid grid-cols-1 lg:grid-cols-2 md:gap-16 items-center">
        <div className="flex flex-col gap-8 text-center lg:text-left">
          <h1 className="text-5xl md:text-6xl font-light text-texto-principal leading-tight">
            Democratizando o acesso à
            <br />
            <strong className="font-bold">Impressão 3D.</strong>
          </h1>
          <p className="text-lg text-texto-secundario max-w-lg mx-auto lg:mx-0">
            Explore o catálogo da <strong>Rethink3D</strong> e descubra criações
            únicas de <strong>Makers</strong> talentosos. Encontre projetos que
            você ama ou solicite algo totalmente <strong>personalizado</strong>,
            feito sob medida para <strong>você</strong>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center lg:justify-start">
            <Link className={styles.gradientBorderButton} to="/catalogo">
              Ver Catálogo &rarr;
            </Link>

            <Link
              className="bg-transparent border border-gray-600 text-texto-principal font-bold py-3 px-8 rounded-lg hover:bg-gray-800 hover:text-white transition-colors duration-300"
              to="/contato"
            >
              Contato
            </Link>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <img
            src="/imagemtest - Copia.png"
            alt="Impressão 3D"
            className={`w-full max-w-[30rem] aspect-square ${styles.animateFloat}`}
          />
        </div>
      </section>

      <section className="py-5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="flex justify-center">
              <img
                src="https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Maker trabalhando em um projeto de tecnologia"
                className="rounded-2xl object-cover w-full h-full max-h-[500px] shadow-lg"
              />
            </div>

            <div className="text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-bold text-texto-principal mb-6 text-center">
                O que é ser um Maker?
              </h2>

              <div className="space-y-6 text-xl text-texto-secundario leading-relaxed text-center">
                <p>
                  Um <strong>Maker</strong> é, em essência, um inventor da era
                  digital. Uma pessoa curiosa e proativa que utiliza a
                  tecnologia para criar, consertar e personalizar o mundo ao seu
                  redor. Movidos pela paixão de aprender e pela satisfação de
                  fazer com as próprias mãos, eles combinam ferramentas
                  modernas, como a impressão 3D, com habilidades tradicionais.
                </p>
                <p>
                  Eles representam a ideia de que qualquer um pode ser um
                  <strong> Maker</strong>, solucionando problemas de forma
                  criativa e transformando um conceito digital em um objeto
                  físico. Cada peça que você encontra aqui nasceu desse espírito
                  inventivo e da busca incansável por materializar grandes
                  ideias.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="main-scroll-container">
        <CredibilityCarousel />
      </section>

      <section id="form-maker" className="scroll-mt-40">
        <InviteForm />
      </section>

      <section className="text-center py-8" id="faq">
        <h2 className="text-2xl sm:text-5xl font-bold text-texto-principal mb-12">
          Perguntas Frequentes
        </h2>

        <FaqAccordion />
      </section>
    </div>
  );
};

export default HomePage;
