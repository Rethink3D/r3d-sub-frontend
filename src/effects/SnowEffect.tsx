import React, { useEffect, useState } from "react";
import { useEffects } from "../context/EffectContext";

interface Snowflake {
  id: number;
  left: string;
  animationDuration: string;
  opacity: number;
  size: string;
  character: string;
  delay: string;
}

export const SnowEffect: React.FC = () => {
  const { isSnowEnabled } = useEffects();
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const chars = ["❅", "❆"];
    
    const flakes = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 21 + 17}s`,
      opacity: Math.random() * 0.8 + 0.3,
      size: `${Math.random() * 1.5 + 0.9}rem`, 
      character: chars[Math.floor(Math.random() * chars.length)],
      delay: `-${Math.random() * 15}s`,
    }));
    setSnowflakes(flakes);
  }, []);

  if (!isSnowEnabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
      <style>
        {`
          @keyframes snowfall {
            0% {
              transform: translateY(-10vh) translateX(0) rotate(0deg);
            }
            25% {
              transform: translateX(15px) rotate(45deg);
            }
            50% {
              transform: translateX(-15px) rotate(180deg);
            }
            75% {
              transform: translateX(15px) rotate(270deg);
            }
            100% {
              transform: translateY(110vh) translateX(0) rotate(360deg);
            }
          }
          .snowflake {
            position: absolute;
            top: -50px;
            user-select: none;
            animation-name: snowfall;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
            text-shadow: 0 0 5px rgba(255,255,255,0.4);
          }
        `}
      </style>
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake text-slate-300 dark:text-white"
          style={{
            left: flake.left,
            fontSize: flake.size,
            opacity: flake.opacity,
            animationDuration: flake.animationDuration,
            animationDelay: flake.delay,
          }}
        >
          {flake.character}
        </div>
      ))}
    </div>
  );
};