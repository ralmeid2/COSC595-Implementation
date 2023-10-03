import style from './AdminMenu.module.css'
import { useNavigate } from 'react-router-dom'
import { Button } from '..'



export default function AdminMenu() {
    const navigate = useNavigate()

    const addDailyNotice = async () => {
        navigate('/add')
    }
    const photoAdmin = async () => {
        navigate('/photo')
    }

    const displayOptions = async () => {
        navigate('/admin-options')
    }

    const deleteDailyNotice = async () => {
        navigate('/delete')
    }

    const editDailyNotice = async () => {
        navigate('/edit')
    }
    const goToDisplay = async () => {
        navigate('/')
    }

    const fullscreenOptions = async () => {
        navigate('/fullscreen')
    }

    if (window.location.pathname === '/admin'){
        return(
                <div>
                    <div className={style.buttonContainerAdmin}>
                        <Button onClick={addDailyNotice}
                            type="submit"
                        >
                            Add Daily Notice
                        </Button>
                        <Button onClick={photoAdmin}
                            type="submit"
                        >
                            Add/Remove Photos
                        </Button>
                        <Button onClick={displayOptions}
                            type="submit"
                        >
                            Display Options
                        </Button>
                        <Button onClick={editDailyNotice}
                            type="submit"
                        >
                            Edit Daily Notice
                        </Button>
                        <Button onClick={deleteDailyNotice}
                            type="submit"
                        >
                            Delete Daily Notice
                        </Button>
                        <Button onClick={goToDisplay}
                            type="submit"
                        >
                            Go To Display
                        </Button>
                    </div>
                </div>
        )
    }else{
        return (
                <div className={style.buttonContainerAdmin}>
                    <div className={style.buttonGroup}>
                        <Button onClick={addDailyNotice}
                                type="submit"
                        >
                            Add Daily Notice
                        </Button>
                        <Button onClick={photoAdmin}
                                type="submit"
                        >
                            Add/Remove Photos
                        </Button>
                        <Button onClick={displayOptions}
                                type="submit"
                        >
                            Display Options
                        </Button>
                        <Button onClick={editDailyNotice}
                                type="submit"
                        >
                            Edit Daily Notice
                        </Button>
                        <Button onClick={deleteDailyNotice}
                                type="submit"
                        >
                            Delete Daily Notice
                        </Button>
                    </div>
                    <div className={style.buttonGroup}>
                        <Button onClick={fullscreenOptions}
                            type="submit"
                        >
                            Choose Full-Screen View
                        </Button>
                        <Button onClick={goToDisplay}
                            type="submit"
                        >
                            Go To Main Display
                        </Button>
                    </div>
                </div>
        )
    }

}
