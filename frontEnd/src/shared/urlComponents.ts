import { Timer, Header, PointsChart, Slideshow, Upcoming, WallOfFame, Marketing, DailyNoticesView } from '../components'

/** Add components that should have a standalone display mode to this * */
export const urlComponents =
  {
    "timer": Timer,
    "points": PointsChart,
    "events": Upcoming,
    "notices": DailyNoticesView,
    "slideshow": Slideshow,
    "marketing": Marketing,
    "walloffame": WallOfFame
  }
