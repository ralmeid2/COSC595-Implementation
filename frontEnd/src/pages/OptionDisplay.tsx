import {useParams} from "react-router-dom";

import {useEffect, useState} from "react";
import {DailyNotice} from "../types";
import {urlComponents} from "../shared/urlComponents";

// UrlComponentName is a type representing the keys of the urlComponents object.
// Using keyof typeof allows TypeScript to infer the keys, making it a type-safe way to ensure `pageId` will match one of the keys in urlComponents.
type UrlComponentName = keyof typeof urlComponents;

/**
 * The fullscreen view for a component. The component is determined by the `pageId` parameter in the URL.
 * Route: /fullscreen/:componentName
 * See frontEnd/src/shared/urlComponents.ts for a list of all components.
 * Fullscreen CSS styles are defined within each component's style.css file.
 */
export default function OptionDisplay() {
  const { pageId } = useParams<{ pageId: UrlComponentName }>();

  // Note: copied from Body.tsx. TODO: refactor to use a custom hook
  const [noticesData, setNoticesData] = useState<Array<DailyNotice>>([]);
  const [dailyNoticesLoading, setDailyNoticesLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchNoticesData = async () => {
      try {
        setDailyNoticesLoading(true);
        const response = await fetch('/api/dailyNotices');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setNoticesData(data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      } finally {
        setDailyNoticesLoading(false);
      }
    };

    fetchNoticesData();
  }, []);
  // End copied section


  const PageComponent = pageId ? urlComponents[pageId] : null;

  return (
    <>
      {/* If adding a new component that requires any props, add the props down below */}
      {PageComponent ? <PageComponent isFullScreen={true} noticesData={noticesData} isLoading={dailyNoticesLoading} /> : <div>Component not found</div>}
    </>
  );
}
