import React from "react";

const CategoryCard: React.FC<{ imageUrl: string; name: string }> = ({
    imageUrl,
    name,
}) => {
    return (
        <div className="relative rounded-lg overflow-hidden group">
            <img
                src={imageUrl}
                alt={name}
                className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold">{name}</h3>
            </div>
        </div>
    );
};

export default CategoryCard;