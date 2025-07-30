import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  // Pega o `pathname` (ex: "/", "/quem-somos") da URL atual
  const { pathname } = useLocation();

  // Roda um efeito toda vez que o `pathname` mudar
  useEffect(() => {
    // Rola a janela para o topo (posição x: 0, y: 0)
    window.scrollTo(0, 0);
  }, [pathname]); // A dependência é o pathname

  // Este componente não renderiza nada na tela
  return null;
};

export default ScrollToTop;