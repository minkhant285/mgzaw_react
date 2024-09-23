import React, { useState } from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";

interface ResponsiveImageProps {
    src: string;
    alt: string;
    containerHeight: number; // Set the container's fixed height
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({ src, alt, containerHeight }) => {
    const [objectFit, setObjectFit] = useState<'contain' | 'cover'>('cover');

    const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const image = e.currentTarget;
        const imageAspectRatio = image.naturalWidth / image.naturalHeight;
        const containerAspectRatio = window.innerWidth / containerHeight; // container width is 100% (window width)

        // Decide object-fit based on the comparison of aspect ratios
        if (imageAspectRatio > containerAspectRatio) {
            setObjectFit('cover');
        } else {
            setObjectFit('contain');
        }
    };

    return (
        <div
            style={{
                width: '100%', // Full width
                height: containerHeight, // Fixed height
                overflow: 'hidden',
            }}
        >
            <LazyLoadImage
                src={src}
                alt={alt}
                onLoad={handleImageLoad}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: objectFit,
                    padding: objectFit === 'contain' ? 4 : 0
                }}
            />
        </div>
    );
};

export default ResponsiveImage;
