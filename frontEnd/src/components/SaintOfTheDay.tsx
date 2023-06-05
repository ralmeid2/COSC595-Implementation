import style from './SaintOfTheDay.module.css'
import veronica from '../images/veronica.jpeg'

interface EventListProps {
    isFullScreen: boolean;
}



const SaintOfTheDay: React.FC<EventListProps> = ({ isFullScreen }) => {
const containerStyle = isFullScreen? style.fullScreen : style.multiScreen
const tempSaint = "Saint Veronica, celebrated on June 3rd, showed compassion to Jesus by offering him her veil to wipe his face, resulting in his image appearing on the cloth. Her story symbolizes selflessness and love."
    return(
        <div className={containerStyle}>
            <h2 className={style.eventTitle}>Saint of the Day</h2>
            <div className={style.photo}><img src={veronica} alt = "Veronica" width="70" height="70"/></div>
            <div className={style.circleLarge}></div>
            <div className={style.text}>{tempSaint}</div>
        </div>
    )

}

export default SaintOfTheDay
