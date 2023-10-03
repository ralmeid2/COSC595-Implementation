import React, { useEffect, useState } from 'react';
import style from './Slideshow.module.css'

interface PhotoItem {
    name: string;
}

interface SlideshowProps {
    isFullScreen: boolean;
}
//photos for this component are uploaded from the photo uploader app. 
/**
 * Displays all images categorised as marketing.
 * @param isFullScreen
 */

const Marketing = ({isFullScreen}: SlideshowProps) => {
    const [photos, setPhotos] = useState<PhotoItem[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        //get all the marketing photos in the photo location. The category is determined by /marketing
        const fetchPhotos = async () => {
            try {
                const response = await fetch('/api/photo/marketing');
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
    //photos change every 10 seconds
    //could be worth adding some animation here
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
      <div className={isFullScreen ? style.fullScreen : ''}>
        <div className={style.slideshow}>
            <img src={"/uploads/" + photos[currentIndex].name} alt="Slideshow" />
        </div>
      </div>
    );
};

export default Marketing;
