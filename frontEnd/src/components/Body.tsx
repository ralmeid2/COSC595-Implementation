import { useEffect, useState } from 'react';
import style from './Body.module.css';
import Timer from './Timer';
import Header from './Header';
import PointsChart from './PointsChart';
import Slideshow from './Slideshow';
import Upcoming from './Upcoming';
import { DailyNotice } from '../types';
import DailyNoticesView from './DailyNotices';
import Broadcast from './Broadcast';

interface ConditionalRenderingProps {
    components: React.ReactNode[];
}

function ConditionalRendering({ components }: ConditionalRenderingProps) {
    const [currentComponentIndex, setCurrentComponentIndex] = useState(0);

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
    const [options, setOptions] = useState<{
        multiComponentView: boolean;
        timer: React.ReactNode;
        points: React.ReactNode;
        events: React.ReactNode;
        notices: React.ReactNode;
        broadcast: React.ReactNode;
    } | null>(null);

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

    const { multiComponentView, timer, points, events, notices, broadcast } = options;

    if (multiComponentView) {
        return (
            <>
                <Header />
                <div className={style.componentContainer}>
                    <div className={style.LeftSide}>
                        <Timer isFullScreen={isFullScreen} />
                        <PointsChart houses={houses} isFullScreen={isFullScreen} />
                        <Upcoming isFullScreen={isFullScreen}/>
                    </div>
                    <div className={style.rightSide}>
                        <DailyNoticesView isFullScreen={isFullScreen} noticesData={noticesData} isLoading={dailyNoticesLoading} />
                    </div>
                </div>
                <Slideshow />
            </>
        );
    } else {
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
            componentsToShow.push(<Upcoming isFullScreen={isFullScreen}/>);
        }
        if (broadcast) {
            componentsToShow.push(<Broadcast />);
        }
        return (
            <div>
                <ConditionalRendering components={componentsToShow} />
            </div>
        );
    }
}
