import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Image } from "../../../types/types";
import { CropData } from "../../../services/api";

const DragHandleIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="cursor-grab active:cursor-grabbing"
    >
        <circle cx="12" cy="12" r="1"></circle>
        <circle cx="12" cy="5" r="1"></circle>
        <circle cx="12" cy="19" r="1"></circle>
    </svg>
);

export type DisplayImage =
    | (Image & { 
        isNew?: false; 
        cropData?: CropData; 
        needsRecrop?: boolean;
      })
    | { 
        id: string; 
        originalUrl: string; 
        croppedUrl?: string; 
        file: File; 
        isNew: true; 
        cropData?: CropData 
        needsRecrop?: boolean;
      };

interface SortableImageProps {
    image: DisplayImage;
    onDelete: () => void;
    onCrop: () => void;
}

export const SortableImage: React.FC<SortableImageProps> = ({
    image,
    onDelete,
    onCrop,
}) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: image.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            className="relative group touch-none"
        >
            <img
                src={
                    "originalUrl" in image
                        ? image.croppedUrl || image.originalUrl
                        : image.urlThumbnail || image.urlDisplay
                }
                alt="Preview do produto"
                className="w-full h-32 object-cover rounded-md border"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity z-10">
                <button
                    type="button"
                    onClick={onCrop}
                    className="bg-blue-500 text-white text-xs px-2 py-1 rounded"
                >
                    Cortar
                </button>

                <button
                    type="button"
                    onClick={onDelete}
                    className="bg-red-500 text-white text-xs px-2 py-1 rounded"
                >
                    {image.isNew ? "Remover" : "Excluir"}
                </button>
            </div>

            <div
                {...listeners}
                className="absolute top-1 right-1 p-1 bg-gray-900/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity z-20"
            >
                <DragHandleIcon />
            </div>
        </div>
    );
};
