import React from "react";

const MailIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
const GithubIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
  </svg>
);
const InstagramIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const ContatoPage: React.FC = () => {
  return (
    <div className="flex flex-col flex-grow justify-center py-12 text-texto-principal">
      <h1 className="text-5xl font-bold mb-10 text-center">Entre em contato</h1>

      <div className="grid grid-cols-1  gap-16 items-start">
        <div className="bg-white dark:bg-[#1a1a1a] border dark:border-gray-700 rounded-2xl p-8 flex flex-col gap-6 max-w-2xl mx-auto w-full">
          <h3 className="text-3xl font-bold text-texto-principal">
            Nossos Canais
          </h3>
          <p className="text-texto-secundario">
            Prefere um contato mais direto? Encontre-nos nas seguintes
            plataformas.
          </p>
          <a
            href="mailto:rethink3dbr@gmail.com"
            className="
                flex items-center gap-4 text-lg text-texto-principal
                transition-transform duration-200 transform hover:scale-105
                hover:text-blue-400
              "
          >
            <MailIcon className="w-7 h-7 text-blue-400" />
            <span>rethink3dbr@gmail.com</span>
          </a>

          <a
            href="https://github.com/Rethink3D"
            target="_blank"
            rel="noopener noreferrer"
            className="
                flex items-center gap-4 text-lg text-texto-principal
                transition-transform duration-200 transform hover:scale-105
                hover:text-gray-400
              "
          >
            <GithubIcon className="w-7 h-7 text-gray-400" />
            <span>Rethink3D</span>
          </a>

          <a
            href="https://www.instagram.com/_rethink3d/"
            target="_blank"
            rel="noopener noreferrer"
            className="
                flex items-center gap-4 text-lg text-texto-principal
                transition-transform duration-200 transform hover:scale-105
                hover:text-pink-400
              "
          >
            <InstagramIcon className="w-7 h-7 text-pink-400" />
            <span>_rethink3d</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContatoPage;
