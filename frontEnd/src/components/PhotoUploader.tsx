import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import styles from './PhotoUploader.module.css'
import Button from "./Button";

interface Photo {
  name: string;
  url: string;
  category: string;
}

const PhotoUploader: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [existingPhotos, setExistingPhotos] = useState<Photo[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(''); // Add this state

  useEffect(() => {
    //get all photos that have already been uploaded
    fetch('/api/photo/all')
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
      formData.append('category', selectedCategory); // Include the category in the form data
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
    // Confirm the user wants to delete the photo
    const confirmation = window.confirm('Are you sure you want to delete this photo?');
    if (confirmation) {
      fetch(`/api/photo/${photoId}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Delete successful:', data);

          // Update the existingPhotos state to reload the current images by filtering out the deleted photo
          const updatedPhotos = existingPhotos.filter(photo => photo.name !== photoId);
          setExistingPhotos(updatedPhotos);

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
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="marketing">Marketing</option>
            <option value="slideshow">Slideshow</option>
            <option value="wallOfFame">Wall of Fame</option>
        </select>

        <Button type="submit">Upload</Button>
      </form>

      {existingPhotos.length > 0 && (
        <div>
          <h2>Existing Photos:</h2>
          {
          existingPhotos.map((photo) => (
            <div key={photo.name} className={styles.photo}>
                <img src= {"uploads/"+photo.name} alt="Existing Photo" />
                <p>Category: {photo.category}</p> {/* Display the category */}
                <Button className={styles.delete} onClick={() => handleDelete(photo.name)}>X</Button>
            </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default PhotoUploader;
