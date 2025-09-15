/**
 * Envia um evento customizado para o Google Analytics.
 * @param eventName O nome do evento (ex: 'Clique no Contato').
 * @param eventParams Parâmetros adicionais, como o 'label'.
 */
export const trackEvent = (eventName: string, eventParams: { [key: string]: string }) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, eventParams);
  } else {
    console.warn('Google Analytics (gtag) não está disponível. O evento não foi rastreado.');
  }
};