import React from 'react';
import { Link } from 'react-router-dom';
import { urlComponents } from '../shared/urlComponents';

import style from './OptionChoice.module.css';

export default function OptionChoice() {
  return (
    <div className={style.gridContainer}>
      {Object.keys(urlComponents).map((key) => {
        if (Object.prototype.hasOwnProperty.call(urlComponents, key)) {
          const componentKey = key as keyof typeof urlComponents;
          /** NOTE: .name MIGHT BE LOST ONCE IN PRODUCTION AND CODE IS MINIFIED. MIGHT HAVE TO USE `componentKey` as the name **/
          const componentName = urlComponents[componentKey].name;
          return (
            <Link to={`/fullscreen/${componentKey}`} key={componentKey}>
              <div className={style.gridItem}>
                {/* TODO: Add actual images */}
                <img src={`images/${componentKey}.png`} alt={componentName} />
                <p>{componentName}</p>
              </div>
            </Link>
          );
        }
        return null; // or some other fallback
      })}
    </div>
  );
}
