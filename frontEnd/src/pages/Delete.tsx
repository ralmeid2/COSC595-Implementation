import { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Message, AdminMenu } from '../components'
import { del, get } from '../utils/http'
import { DailyNotice } from '../types/DailyNotice'
import styles from './Delete.module.css'

export default function Delete() {
    const [dailyNotices, setDailyNotices] = useState<DailyNotice[]>([])

    useEffect(() => {
        fetchDailyNotices()
    }, [])

    const deleteHandler = (id: string) => {
        const confirm = window.confirm("Are you sure you want to delete this notice?")
        if (confirm === true) {
            deleteOneDailyNotice(id)
        }
    };

    const fetchDailyNotices = useCallback(async () => {
        try {
            const dn = await get<DailyNotice[]>(`/api/dailyNotices`)
            setDailyNotices(dn)
            return dn
        } catch (err) {
            return err
        }
    }, [])

    const deleteOneDailyNotice = async (id: string) => {
        try {
            const d = await del(`/api/dailyNotices/${id}`)
            fetchDailyNotices()
            return d
        } catch (err) {
            return err
        }
    }

    return (
      <body>
      <AdminMenu />
      <div className={styles.list} >
      <h1>Please click on an item to delete it</h1>
          {dailyNotices.map(
            ({ _id, title, message, startDate, expiryDate }) => {
                return (
                  <div className={styles.item} key={_id} onClick={() => deleteHandler(_id)}>
                                <span >
                                    {title} {message} {startDate} {expiryDate}
                                </span>
                  </div>
                )
            }
          )}
      </div>
      </body>
    )
}
