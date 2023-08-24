import {useParams} from "react-router-dom";

import { Timer, Header, PointsChart, Slideshow, Upcoming, SaintOfTheDay } from '../components'
import houses from '../shared/houses.json';

const COMPONENTS = {
  Timer,
  Header,
  PointsChart,
  Slideshow,
  Upcoming,
  SaintOfTheDay
};

type ComponentName = keyof typeof COMPONENTS;

export default function OptionDisplay() {
  const { pageId } = useParams<{ pageId: ComponentName }>();

  const PageComponent = pageId ? COMPONENTS[pageId] : null;

  return (
    <>
      {PageComponent ? <PageComponent isFullScreen={false} houses={houses} /> : <div>Component not found</div>}
    </>
  );
}

