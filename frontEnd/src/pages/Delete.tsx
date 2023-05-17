import style from './Edit.module.css'
import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Message } from '../components'
import { post, get } from '../utils/http'
import { DailyNotices } from '../types/DailyNotices'



export default function Delete(){
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [message, setMessage] = useState("")
    const [startDate, setStartDate] = useState("")
    const [expiryDate, setExpiryDate] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [checked, setChecked] = useState<string[]>([]);
    const [dailyNotices, setDailyNotices] = useState <DailyNotices[]>([])

    const handleCheck = (event: { target: { checked: any; value: any } }) => {
    var updatedList = [...checked];
    if (event.target.checked) {
        updatedList = [...checked, event.target.value];
    } else {
        updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
    };

    const addDailyNotice = async () => {
        navigate('/add')
    }

    const editDailyNotice = async () => {
        navigate('/edit')
    }

    const deleteDailyNotice = async () => {
        navigate('/delete')
    }

    useEffect(() => {
        fetchDailyNotices()
    }, [])
    
    const fetchDailyNotices = useCallback(async () => {
      try{
        const dn = await get<DailyNotices[]>(`/api/dailyNotices`)
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
    },[])

     return (
      <div>
        <div className={style.buttonContainer}>
         <Button onClick={addDailyNotice}
            type="submit"
          >
            Add Daily Notice
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
        
        <div className={style.checkList}>
          { dailyNotices.map(
            ({ _id, title, message, startDate, expiryDate }) => {
              return(
                <div className={style.item} key={_id}>
                <input value={_id} type="checkbox" onChange={handleCheck} />
                {title} {message} {startDate} {expiryDate}
                </div>
              )}
             
          )}
          
          </div>
        </div>
      )
}