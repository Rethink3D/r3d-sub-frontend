import React from "react";

const VideoCard: React.FC<{ videoSrc: string; title: string }> = ({
  videoSrc,
  title,
}) => {
  return (
    <div className="bg-gray-300 dark:bg-[#1a1a1a] border border-gray-800 rounded-lg p-4">
      <h3 className="text-texto-principal font-bold text-lg mb-4 text-center">
        {title}
      </h3>
      <video className="w-full rounded" autoPlay loop muted playsInline>
        <source src={videoSrc} type="video/mp4" />O seu navegador não suporta o
        vídeo.
      </video>
    </div>
  );
};

export default VideoCard;