import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { urlComponents } from '../shared/urlComponents';
import style from './OptionChoice.module.css';

export default function OptionChoice() {
  const [imagePaths, setImagePaths] = useState<Record<string, string>>({});

  useEffect(() => {
    async function loadImagePaths() {
      const paths: Record<string, string> = {};
      for (const key of Object.keys(urlComponents)) {
        try {
          const path = await import(`../images/components/${key}.png`);
          paths[key] = path.default;
        } catch (error) {
          // Image not found, skip
          console.warn(`Image for ${key} not found.`);
        }
      }
      setImagePaths(paths);
    }

    loadImagePaths();
  }, []);

  return (
    <div className={style.gridContainer}>
      {Object.keys(urlComponents).map((key) => {
        if (Object.prototype.hasOwnProperty.call(urlComponents, key)) {
          const componentKey = key as keyof typeof urlComponents;
          const componentName = urlComponents[componentKey].name;
          return (
            <Link to={`/fullscreen/${componentKey}`} key={componentKey}>
              <div className={style.gridItem}>
                {imagePaths[componentKey] && (
                  <img src={imagePaths[componentKey]} alt={componentName} className={style.image}/>
                )}
                <p>{componentName}</p>
              </div>
            </Link>
          );
        }
      })}
    </div>
  );
}
