import style from './Add.module.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Message } from '../components'
import { post } from '../utils/http'



export default function Add(){
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [message, setMessage] = useState("")
    const [startDate, setStartDate] = useState("")
    const [expiryDate, setExpiryDate] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const addDailyNotice = async () => {
      navigate('/add')
    }

    const deleteDailyNotice = async () => {
      navigate('/delete')
    }

    const editDailyNotice = async () => {
      navigate('/edit')
    }

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
        alert("Your daily notice has been added")
        return res
      }
      catch(err){
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


        </form>
        </div>
      )

}

