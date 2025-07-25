import React from "react";
import ContactForm from "../components/inviteForm/InviteForm";

const HomePage: React.FC = () => {
    return (
        <div>
            <div className="flex flex-col items-center justify-center">
                <h1>Página Inicial</h1>
                <p>
                    Bem-vindo ao nosso site! Navegue pelo menu para conhecer
                    mais.
                </p>
            </div>
            <div className="flex flex-col items-center justify-center">
                <ContactForm />
            </div>
        </div>
    );
};

export default HomePage;
