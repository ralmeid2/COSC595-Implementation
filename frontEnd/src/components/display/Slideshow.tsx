import React, { useEffect, useState } from 'react';
import style from './Slideshow.module.css'

//
/**The photo slideshow gets photos from the photo handler
 * 
 * @param isFullScreen determines how the slideshow is displayed
 * @param photos a list of photos availablephoto slideshow needs a list of photo names
 * names corresponds to the file names in the /public/uploads folder
 */

interface PhotoItem {
    name: string;
}

interface SlideshowProps {
    isFullScreen: boolean;
}

const Slideshow = ({isFullScreen}: SlideshowProps) => {
    const [photos, setPhotos] = useState<PhotoItem[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        //get all the photos in the photo location
        //might want to add categories here
        const fetchPhotos = async () => {
            try {
                const response = await fetch('/api/photo/slideshow');
                if (response.ok) {
                    const data = await response.json();
                    // alert(JSON.stringify(data))
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
      <div data-testid="slideshow" className={isFullScreen ? style.fullScreen : ''}>
        <div className={style.slideshow}>
            <img src={"/uploads/" + photos[currentIndex].name} alt="Slideshow" />
        </div>
      </div>
    );
};

export default Slideshow;
