import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { urlComponents } from '../shared/urlComponents';
import style from './OptionChoice.module.css';
import {Button} from "../components";

/**
 * Displays all the components that can be displayed in fullscreen mode. Can click on a component to go to the fullscreen mode of that component.
 * Route: /fullscreen
 * Add to frontEnd/src/shared/urlComponents.ts to add a new component to the grid.
 */
export default function OptionChoice() {
  const [imagePaths, setImagePaths] = useState<Record<string, string>>({});

  // Load all images from the components folder
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
    <>
      <div className={style.select}>Click on an item to open it in full-screen.</div>
      <a onClick={() => {
        window.location.href = '/admin-options';
      }} className={style.back}>Or click here to go back.</a>
      <div className={style.gridContainer}>
        {Object.keys(urlComponents).map((key) => {
          if (Object.prototype.hasOwnProperty.call(urlComponents, key)) {
            // The key is guaranteed to be a keyof typeof urlComponents (i.e. "timer", "points", etc.)
            const componentKey = key as keyof typeof urlComponents;
            // componentName is the name of the component (i.e. "Timer", "PointsChart", etc.)
            /** NOTE: .name MIGHT BE LOST ONCE IN PRODUCTION AND CODE IS MINIFIED. MIGHT HAVE TO USE `componentKey` as the name **/
            const componentName = urlComponents[componentKey].name;
            return (
              <Link to={`/fullscreen/${componentKey}`} key={componentKey}>
                <div className={style.gridItem} data-testid="grid-item">
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
    </>
  );
}
