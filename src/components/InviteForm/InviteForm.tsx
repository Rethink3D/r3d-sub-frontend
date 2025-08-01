import React, { useState } from "react";

const CubeIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-12 h-12 text-yellow-300 mb-4"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
        />
    </svg>
);

const InviteForm: React.FC = () => {
    const [name, setName] = useState("");
    const [contactInfo, setContactInfo] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{
        text: string;
        type: "success" | "error";
    } | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);
        setMessage(null);

        try {
            const response = await fetch(
                "https://r3d-sub-backend.onrender.com/maker-invite",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        nome: name,
                        email: contactInfo,
                        checked: false,
                    }),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    errorData.message ||
                        "Ocorreu um erro ao enviar seu convite."
                );
            }

            setMessage({
                text: "Obrigado! Sua solicitação foi recebida, em breve entraremos em contato.",
                type: "success",
            });
            setName("");
            setContactInfo("");

            setTimeout(() => {
                setMessage(null);
            }, 3000);
        } catch (error: any) {
            console.error("Erro ao enviar o formulário:", error);
            setMessage({
                text:
                    error.message ||
                    "Falha na comunicação com o servidor. Tente novamente.",
                type: "error",
            });

            setTimeout(() => {
                setMessage(null);
            }, 3000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-lg mx-auto border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1F1F24] rounded-lg p-8 shadow-lg">
            <div className="flex flex-col items-center text-center mb-8">
                <CubeIcon />
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                    Exponha seus produtos e serviços na Rethink3D
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-md">
                    Buscamos Makers entusiastas e/ou prestadores de serviço em
                    impressão 3D para expandir nosso catálogo.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-md">Se você cria, nós ajudamos a divulgar.</p>
            </div>

            <hr className="border-gray-200 dark:border-gray-700 my-8" />

            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Nome
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-3 transition-colors duration-300"
                        placeholder="Como podemos te chamar?"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isSubmitting}
                    />
                </div>

                <div className="mb-6">
                    <label
                        htmlFor="contactInfo"
                        className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Contato
                    </label>
                    <input
                        type="text"
                        id="contactInfo"
                        className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-3 transition-colors duration-300"
                        placeholder="Email / Celular / WhatsApp / Instagram"
                        required
                        value={contactInfo}
                        onChange={(e) => setContactInfo(e.target.value)}
                        disabled={isSubmitting}
                    />
                </div>

                {message && (
                    <div
                        className={`text-center p-2 mb-4 rounded-md text-sm ${
                            message.type === "success"
                                ? "bg-green-800 text-green-200"
                                : "bg-red-800 text-red-200"
                        }`}
                    >
                        {message.text}
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full mt-4 p-0.5 dark:p-[1px] rounded-lg font-bold dark:text-white
                    bg-[conic-gradient(from_275deg,#FF00DD_10%,#FF55CC_15%,#EEEE7A_40%,#CCEEAA_45%,#00EEFF_70%,#55EEFF_75%)]
                    shadow-[0_0_5px_rgba(128,128,128,0.3)]
                    transition-all duration-300 ease-in-out
                    hover:scale-105
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    disabled={isSubmitting}
                >
                    <span
                        className="block w-full h-full px-5 py-3 rounded-[7px]
                          bg-white dark:bg-[#1F1F24] 
                          transition-colors duration-300
                          group-disabled:bg-gray-600"
                    >
                        {isSubmitting ? "Enviando..." : "Juntar-se"}
                    </span>
                </button>
            </form>
        </div>
    );
};

export default InviteForm;
