import style from './Add.module.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Message } from '../components'
import { post, get } from '../utils/http'
import { DailyNotice } from '../types/DailyNotice'



export default function Claire(){
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [message, setMessage] = useState("")
    const [startDate, setStartDate] = useState("")
    const [expiryDate, setExpiryDate] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [dailyNotices, setDailyNotices] = useState <DailyNotice[]>([])

    const addDailyNotice = async () => {
       navigate('/add')
    }

    const editDailyNotices = async () => {
       navigate('/edit')
    }

    const deleteDailyNotice = async () => {
       navigate('/delete')
    }


    const fetchDailyNotices = async () => {
      try{
        const dn = await get<DailyNotice[]>(`/api/dailyNotices`)
        setDailyNotices(dn)
        setTitle("")
        setAuthor("")
        setMessage("")
        setStartDate("")
        setExpiryDate("")
        return dn
      }catch(err){
        return err
      }
    }
    

    return (
      <div>
        <div className={style.buttonContainer}>
         <Button onClick={addDailyNotice}
            type="submit"
          >
            Add Daily Notice
          </Button>
          <Button onClick={editDailyNotices}
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
       </div>
       
      )

}