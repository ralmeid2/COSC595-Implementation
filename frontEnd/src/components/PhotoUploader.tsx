import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import styles from './PhotoUploader.module.css'
import Button from "./Button";

interface Photo {
  id: string;
  url: string;
}

const PhotoUploader: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [existingPhotos, setExistingPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    fetch('/api/photo')
      .then((response) => response.json())
      .then((data) => {
        setExistingPhotos(data);
      })
      .catch((error) => {
        console.error('Error retrieving existing photos:', error);
      });
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file || null);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (selectedFile) {
      const formData = new FormData();
      formData.append('photo', selectedFile);

      fetch('/api/photo', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Upload successful:', data);
          // Do something with the server's response
        })
        .catch((error) => {
          console.error('Error during upload:', error);
          // Handle error
        });
    }
  };

  const handleDelete = (photoId: string) => {
    const confirmation = window.confirm('Are you sure you want to delete this photo?');
    if (confirmation) {
      fetch(`/api/photo/${photoId}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Delete successful:', data);
          // Do something with the server's response
        })
        .catch((error) => {
          console.error('Error during delete:', error);
          // Handle error
        });
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <Button type="submit">Upload</Button>
      </form>

      {existingPhotos.length > 0 && (
        <div>
          <h2>Existing Photos:</h2>
          {existingPhotos.map((photo) => (
            <div key={photo.id} className = {styles.photo}>
              <img src={photo.url} alt="Existing Photo" />
              <Button className={styles.delete} onClick={() => handleDelete(photo.id)}>X</Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoUploader;
