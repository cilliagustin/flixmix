import React, { useState } from 'react';
import styles from '../styles/FullScreenModal.module.css'

/**
 * takes the src and alt of a target image and gives it to the modal.
 */
export const FullScreenModal = ({ src, alt, handleClick }) => {
    return (
        <div
            className={styles.Modal}
        >
            <img
                src={src} alt={alt}
                className={styles.PosterOverlay}
                onClick={handleClick}
            />
            <img
                src={src} alt={alt}
                className={styles.Poster}
                onClick={handleClick}
            />
        </div>
    );
};

/**
 * when clicked the full screen modal it changes the active state of the modal to remove it
 */
export const useFullScreen = () => {
    const [fullScreen, setFullScreen] = useState(false);
    const [imageData, setImageData] = useState({ src: '', alt: '' });

    const handleFullScreen = (e) => {
        if (!fullScreen) {
            const src = e.target.src;
            const alt = e.target.alt;
            setImageData({ src, alt });
        }
        setFullScreen(!fullScreen);
    };

    return { fullScreen, handleFullScreen, imageData };
};