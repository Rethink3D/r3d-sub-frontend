
import elfHatPng from "/promotional/elfhat.png"; 

export const ElfHat = ({ className }: { className?: string }) => (
  <img
    src={elfHatPng}
    alt="Chapéu de Elfo"
    className={className}
    draggable={false} 
  />
);