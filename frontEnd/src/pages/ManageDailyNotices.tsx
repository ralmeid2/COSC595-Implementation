import style from './Add.module.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Message, Header, AdminMenu } from '../components'
import { post, get } from '../utils/http'
import { DailyNotice } from '../types/DailyNotice'
import AdminOptions from './AdminOptions'



export default function Claire(){
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [message, setMessage] = useState("")
    const [startDate, setStartDate] = useState("")
    const [expiryDate, setExpiryDate] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [dailyNotices, setDailyNotices] = useState <DailyNotice[]>([])



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
        <AdminMenu />
       </div>
       
      )

}