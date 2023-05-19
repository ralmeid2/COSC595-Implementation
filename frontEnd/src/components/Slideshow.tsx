import React, { useEffect, useState } from 'react';
import style from './Slideshow.module.css'

interface PhotoItem {
    id: string;
    url: string;
}

const Slideshow: React.FC = () => {
    const [photos, setPhotos] = useState<PhotoItem[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await fetch('/api/photo');
                if (response.ok) {
                    const data = await response.json();
                    setPhotos(data);
                } else {
                    console.error('Failed to fetch photos:', response.status);
                }
            } catch (error) {
                console.error('Error fetching photos:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPhotos();
    }, []);

    useEffect(() => {
        if (photos.length === 0) return;

        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
        }, 10000);

        return () => {
            clearInterval(intervalId);
        };
    }, [photos]);

    if (isLoading) {
        return <p>Loading photos...</p>;
    }

    if (photos.length === 0) {
        return <p>No photos available.</p>;
    }

    return (
        <div className={style.slideshow}>
            <img src={photos[currentIndex].url} alt="Slideshow" />
        </div>
    );
};

export default Slideshow;
