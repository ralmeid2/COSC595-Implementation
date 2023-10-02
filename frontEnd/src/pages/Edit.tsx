import style from './Edit.module.css'
import styles from './Admin.module.css'
import { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, AdminMenu } from '../components'
import { put, get } from '../utils/http'
import { DailyNotice } from '../types/DailyNotice'


/**
 * Can edit a daily notice in the database
 * Route: /edit
 */
export default function Edit() {
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [message, setMessage] = useState("")
    const [startDate, setStartDate] = useState("")
    const [expiryDate, setExpiryDate] = useState("")
    const [selected, setSelected] = useState(false)
    const [dailyNotices, setDailyNotices] = useState<DailyNotice[]>([])
    const [editDailyNotices, setEditDailyNotices] = useState<DailyNotice[]>([])


    useEffect(() => {
        fetchDailyNotices()
    }, [])

    const putToDB = async () => {
        let id = ""
        if (editDailyNotices && editDailyNotices.length > 0) {
            id = editDailyNotices[0]._id
        }
        try {
            const res = await put(`/api/dailyNotices/${id}`, {
                title: title,
                message: message,
                startDate: startDate,
                expiryDate: expiryDate
            })
            setSelected(false)
            fetchDailyNotices()
            return res
        }
        catch (err) {
            return err
        }
    }

    const fetchDailyNotices = useCallback(async () => {
        try {
            const dn = await get<DailyNotice[]>(`/api/dailyNotices`)
            setDailyNotices(dn)
            return dn
        } catch (err) {
            return err
        }
    }, [])

    const fetchOneDailyNotice = useCallback(async (id: string) => {
        try {
            const d = await get<DailyNotice[]>(`/api/dailyNotices/${id}`)
            setEditDailyNotices(d)
            populateForm(d)
            return d
        } catch (err) {
            return err
        }
    }, [])



    const populateForm = async (d: DailyNotice[]) => {
        setTitle(d[0].title)
        setMessage(d[0].message)
        setStartDate(d[0].startDate)
        setExpiryDate(d[0].expiryDate)
    }

    const radioHandler = (id: string) => {
        const confirm = window.confirm("Are you sure you want to edit this notice?")
        if (confirm === true) {
            setSelected(true)
            fetchOneDailyNotice(id)
        }
    }

    if (selected === true) {
        return (
            <div>
                <AdminMenu />
                <form id="input"
                    className={style.container}
                    onSubmit={(e) => {
                        e.preventDefault()
                        putToDB()
                    }}
                >
                    Title
                    <Input
                        name="title"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}
                    />
                    Message
                    <Input
                        name="message"
                        placeholder="Message"
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value)
                        }}
                    />
                    Start Date
                    <Input
                        name="startDate"
                        type = "date"
                        placeholder="Start Date"
                        value={startDate}
                        onChange={(e) => {
                            setStartDate(e.target.value)
                        }}
                    />
                    Expiry Date
                    <Input
                        name="expiryDate"
                        placeholder="Expiry Date"
                        type = "date"
                        value={expiryDate}
                        onChange={(e) => {
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
    } else {
        return (
            <div className = {styles.adminPage}>

                <AdminMenu/>

                <div className={style.checkList}>
                  <h1>Please Click on an Item to Edit it</h1>
                    {dailyNotices && dailyNotices.map(
                        ({ _id, title, message, startDate, expiryDate }) => {
                            return (
                                <div className={style.item} key={_id} onClick={() => radioHandler(_id)} >

                                    {title} {message}
                                </div>
                            )
                        }

                    )}

                </div>
            </div>
        )
    }



}
