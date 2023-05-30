import style from './AdminMenu.module.css'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Message } from '../components'
import { post } from '../utils/http'



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
                            Add/Edit Photos
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
            <div>
                <div className={style.buttonContainer}>
                    <Button onClick={addDailyNotice}
                        type="submit"
                    >
                        Add Daily Notice
                    </Button>
                    <Button onClick={photoAdmin}
                        type="submit"
                    >
                        Add/Edit Photos
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
    }

}

