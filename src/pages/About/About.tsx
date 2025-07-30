import React from "react";
import styles from "./About.module.css";
import VideoCard from "./components/VideoCard";
import FeatureCard from "./components/FeatureCard";


const About: React.FC = () => {
    return (
        <div className="py-12 flex flex-col gap-24">
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeatureCard
                    iconUrl="/company.png"
                    iconBgColor="#7e57c2"
                    title="Sobre a Rethink3D"
                    text="Uma startup de São Luís/MA com a missão de democratizar o acesso à impressão 3D."
                />
                <FeatureCard
                    iconUrl="/goal.png"
                    iconBgColor="#e11d48"
                    title="Nosso Objetivo"
                    text="Conectar pessoas que precisam de impressão 3D com quem pode oferecer o serviço."
                />
                <FeatureCard
                    iconUrl="/rocket.png"
                    iconBgColor="#6401c4"
                    title="Como Funciona"
                    text="Através da nossa plataforma, você pode solicitar impressões 3D, encontrar makers e divulgar seus serviços."
                />
            </section>

            <section className="flex flex-col items-center gap-8">
                <h2 className="text-4xl font-bold text-texto-principal">
                    Veja a plataforma em desenvolvimento em ação:
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-4">
                    <VideoCard
                        videoSrc="/Home_Produtos_Makers.mp4"
                        title="Home, Produtos e Makers"
                    />
                    <VideoCard
                        videoSrc="/Carrinho_Pesquisa_Categorias.mp4"
                        title="Carrinho e Pesquisa"
                    />
                    <VideoCard
                        videoSrc="/Pedidos_Chats_Servicos.mp4"
                        title="Pedidos e Chat"
                    />
                </div>
            </section>
        </div>
    );
};

export default About;
