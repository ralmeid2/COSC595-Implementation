import {useParams} from "react-router-dom";

import { Timer, Header, PointsChart, Slideshow, Upcoming, SaintOfTheDay, DailyNoticesView } from '../components'
import houses from '../shared/houses.json';
import {useEffect, useState} from "react";
import {DailyNotice} from "../types";

const urlComponents =
  {
    "timer": Timer,
    "points": PointsChart,
    "events": Upcoming,
    "notices": DailyNoticesView,
    "header": Header,
    "slideshow": Slideshow,
    "saintoftheday": SaintOfTheDay
  }

type UrlComponentName = keyof typeof urlComponents;

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
      {PageComponent ? <PageComponent isFullScreen={false} houses={houses} noticesData={noticesData} isLoading={dailyNoticesLoading} /> : <div>Component not found</div>}
    </>
  );
}

