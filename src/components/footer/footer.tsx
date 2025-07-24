import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#18181d] border-t border-gray-800 text-gray-400">
      <div className="container mx-auto flex w-full flex-col md:flex-row items-center py-6 px-4 text-center md:text-left">

        <p className="text-sm mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} Rethink3D. Todos os direitos reservados.
        </p>

        {/* Aplicando ml-auto nos links sociais em telas maiores */}
        <div className="flex space-x-6 md:ml-auto">
          <a href="https://www.instagram.com/_rethink3d/" className="hover:text-white transition-colors duration-300">Instagram</a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;