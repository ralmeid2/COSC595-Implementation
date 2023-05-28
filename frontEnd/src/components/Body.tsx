import { useEffect, useState } from 'react';
import style from './Body.module.css';
import { Timer, Header, PointsChart, Slideshow, Upcoming, SaintOfTheDay } from '../components'
import { DailyNotice } from '../types';
import DailyNoticesView from './DailyNotices';
import Broadcast from './Broadcast';

//The body contains the main display screen which will get shown on the TV in the reception area. 

//this is an array of components that will be cycled through when app is in single component full screen mode 

interface ConditionalRenderingProps {
    components: React.ReactNode[];
}

//this component cycles through selected components in full screen mode
function ConditionalRendering({ components }: ConditionalRenderingProps) {
    const [currentComponentIndex, setCurrentComponentIndex] = useState(0);
    //switch between components every 10 seconds
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentComponentIndex((prevIndex) => (prevIndex + 1) % components.length);
        }, 10000);

        return () => {
            clearInterval(intervalId);
        };
    }, [components.length]);

    return (
        <>
            {components.length > 0 && (
                <div>{components[currentComponentIndex]}</div>
            )}
        </>
    );
}

export default function Body() {

    const [isFullScreen, setIsFullScreen] = useState(false);
    //these are house points, this will eventually come from the school database. 
    const houses = [
        { name: 'Clancy', points: 100, color: '#FCDF15' },
        { name: 'Haydon', points: 75, color: '#DF3F33' },
        { name: 'Mulrooney', points: 120, color: '#68D0E9' },
        { name: 'O\'Brien', points: 90, color: '#DEDEDE' },
        { name: 'Rice', points: 90, color: '#1E8A4E' },
        { name: 'Tracy', points: 90, color: '#1A2B95' },
    ];

    const [noticesData, setNoticesData] = useState<Array<DailyNotice>>([]);
    const [dailyNoticesLoading, setDailyNoticesLoading] = useState<boolean>(true);
    //these are the display options which dictate how the display should look
    const [options, setOptions] = useState<{
        multiComponentView: boolean;//controls switch between all components showing on one screen and full screen single component mode
        timer: React.ReactNode;
        points: React.ReactNode;
        events: React.ReactNode;
        notices: React.ReactNode;
        broadcast: React.ReactNode;
        saintOfTheDay: React.ReactNode;
    } | null>(null);

    //get the daily notices
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
    //get the display options
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await fetch('/api/options');

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setOptions(data);
                setIsFullScreen(!data.multiComponentView);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        fetchOptions();
    }, [isFullScreen]);

    if (!options) {
        return <div>Loading...</div>;
    }

    const { multiComponentView, timer, points, events, notices, broadcast, saintOfTheDay } = options;

    if (multiComponentView) {
        //layout for showing all components on a single screen
        return (
            <>
                <Header />
                <div className={style.componentContainer}>
                    <div className={style.firstRow}>
                        <div className={style.LeftSide}>
                            <Timer isFullScreen={isFullScreen} />
                            <PointsChart houses={houses} isFullScreen={isFullScreen} />
                        </div>
                        <div className={style.rightSide}>
                            <DailyNoticesView isFullScreen={isFullScreen} noticesData={noticesData} isLoading={dailyNoticesLoading} />
                        </div>
                    </div>

                    <div className={style.secondRow}>
                        <Upcoming isFullScreen={isFullScreen} />
                        <SaintOfTheDay isFullScreen={isFullScreen} />
                    </div>
                </div>
                <Slideshow />
            </>
        );
    } else {
        //
        const componentsToShow: React.ReactNode[] = [];
        if (timer) {
            componentsToShow.push(<Timer isFullScreen={isFullScreen} />);
        }
        if (points) {
            componentsToShow.push(<PointsChart houses={houses} isFullScreen={isFullScreen} />);
        }
        if (notices) {
            componentsToShow.push(<DailyNoticesView isFullScreen={isFullScreen} noticesData={noticesData} isLoading={dailyNoticesLoading} />);
        }
        if (events) {
            componentsToShow.push(<Upcoming isFullScreen={isFullScreen} />);
        }
        if (broadcast) {
            componentsToShow.push(<Broadcast />);
        }
        if (saintOfTheDay) {
            componentsToShow.push(<SaintOfTheDay isFullScreen={isFullScreen} />)
        }
        return (
            <div>
                <ConditionalRendering components={componentsToShow} />
            </div>
        );
    }
}
