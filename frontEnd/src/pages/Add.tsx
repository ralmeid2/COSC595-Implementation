import style from './Add.module.css'
import { useState } from 'react'
import { Button, Input, Message, AdminMenu, Form } from '../components'
import { post } from '../utils/http'


/**
 * Can add a daily notice to the database
 * Route: /add
 */
export default function Add(){
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [message, setMessage] = useState("")
    const [startDate, setStartDate] = useState("")
    const [expiryDate, setExpiryDate] = useState("")
    const [errorMessage, setErrorMessage] = useState("")


    const postToDB = async () => {
        try{
        const res = await post (`/api/dailyNotices`, {
            title: title,
            author: author,
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
        <AdminMenu />
        <Form
          className={style.container}
          onSubmit={(e) => {
            e.preventDefault()
            postToDB()
          }}
        >
          {errorMessage && <Message variant="error" message={errorMessage} />}
          Title:
          <Input
            name="title"
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setErrorMessage('')
              setTitle(e.target.value)
            }}
          />
          Author:
          <Input
            name="author"
            placeholder="Author"
            value={author}
            onChange={(e) => {
              setErrorMessage('')
              setAuthor(e.target.value)
            }}
          />
          Notice:
          <Input
            name="message"
            placeholder="Message"
            value={message}
            onChange={(e) => {
              setErrorMessage('')
              setMessage(e.target.value)
            }}
          />
          Start Date:
          <Input
            name="startDate"
            placeholder="Start Date"
            type = "date"
            value={startDate}
            onChange={(e) => {
              setErrorMessage('')
              setStartDate(e.target.value)
            }}
          />
          Expiry Date:
           <Input
            name="expiryDate"
            placeholder="Expiry Date"
            type = "date"
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


        </Form>
        </div>
      )

}
