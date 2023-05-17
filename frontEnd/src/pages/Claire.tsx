import style from './Login.module.css'
import { useState } from 'react'
import { Button, Input, Message } from '../components'
import { post, get } from '../utils/http'
import { DailyNotice } from '../types/DailyNotice'



export default function Claire(){
    const [title, setTitle] = useState("")
    const [message, setMessage] = useState("")
    const [startDate, setStartDate] = useState("")
    const [expiryDate, setExpiryDate] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [dailyNotices, setDailyNotices] = useState <DailyNotice[]>([])

    const postToDB = async () => {
        try{
        const res = await post (`/api/dailyNotices`, {
            title: title,
            message: message,
            startDate: startDate,
            expiryDate: expiryDate
        })
        setTitle("")
        setMessage("")
        setStartDate("")
        setExpiryDate("")
        return res
      }
      catch(err){
        return err
      }
    }

    const fetchDailyNotices = async () => {
      try{
        const dn = await get<DailyNotice[]>(`/api/dailyNotices`)
        setDailyNotices(dn)
        setTitle("")
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
        <form id = "input"
          className={style.container}
          onSubmit={(e) => {
            e.preventDefault()
            postToDB()
          }}
        >
          {errorMessage && <Message variant="error" message={errorMessage} />}
          <Input
            name="title"
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setErrorMessage('')
              setTitle(e.target.value)
            }}
          />
          <Input
            name="message"
            placeholder="Message"
            value={message}
            onChange={(e) => {
              setErrorMessage('')
              setMessage(e.target.value)
            }}
          />

          <Input
            name="startDate"
            placeholder="Start Date"
            value={startDate}
            onChange={(e) => {
              setErrorMessage('')
              setStartDate(e.target.value)
            }}
          />
           <Input
            name="expiryDate"
            placeholder="Expiry Date"
            value={expiryDate}
            onChange={(e) => {
              setErrorMessage('')
              setExpiryDate(e.target.value)
            }}
          />
          <Button
            type="submit"
            disabled={!title || !message || !startDate || !expiryDate}
          >
            Submit
          </Button>
          <Button onClick={fetchDailyNotices}
            type="submit"
          >
            View Daily Notices
          </Button>

        </form>

        <div>
          { dailyNotices.map(
            ({ _id, title, message, startDate, expiryDate }) => {
              return(
                <div className={style.list} key={_id}>
                {title} {message} {startDate} {expiryDate}
                </div>
              )}

          )}

          </div>
        </div>
      )
}
