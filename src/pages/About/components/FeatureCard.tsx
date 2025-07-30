import React from "react";
import styles from "../About.module.css"; // isso ta meio ruim

interface FeatureCardProps {
    iconUrl: string;
    iconBgColor: string;
    title: string;
    text: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
    iconUrl,
    iconBgColor,
    title,
    text,
}) => {
    return (
        <div
            className={`
        ${styles.gradientBorder}
        rounded-3xl p-0 dark:p-[1px] h-full shadow-2xl dark:shadow-none
        transform transition-transform duration-200 hover:scale-105
      `}
        >
            <div className="bg-white dark:bg-[#1a1a1a] rounded-[23px] p-8 flex flex-col items-center text-center h-full">
                <div
                    className="rounded-full p-4 mb-5 inline-flex"
                    style={{ backgroundColor: iconBgColor }}
                >
                    <img
                        src={iconUrl}
                        alt={`${title} icon`}
                        className="w-12 h-12"
                    />
                </div>
                <h3 className="text-2xl font-bold text-texto-principal mb-3">
                    {title}
                </h3>
                <p className="text-texto-secundario text-lg leading-relaxed">
                    {text}
                </p>
            </div>
        </div>
    );
};

export default FeatureCard;