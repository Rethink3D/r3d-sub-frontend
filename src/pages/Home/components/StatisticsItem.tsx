import React from "react";

const StatisticsItem: React.FC<{ iconUrl: string; value: string; label: string }> = ({
    iconUrl,
    value,
    label,
}) => {
    return (
        <div className="flex items-center gap-4">
            <img src={iconUrl} alt={label} className="w-8 h-8" />
            <div>
                <p className="text-2xl font-bold text-white">{value}</p>
                <p className="text-sm text-gray-400">{label}</p>
            </div>
        </div>
    );
};

export default StatisticsItem;