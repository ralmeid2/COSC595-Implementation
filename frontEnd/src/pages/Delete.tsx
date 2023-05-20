import style from './Edit.module.css'
import { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Message, AdminMenu } from '../components'
import { del, get } from '../utils/http'
import { DailyNotice } from '../types/DailyNotice'



export default function Delete() {
    const [dailyNotices, setDailyNotices] = useState<DailyNotice[]>([])



    useEffect(() => {
        fetchDailyNotices()
    }, [])


    const radioHandler = (id: string) => {
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
            <div className={style.checkList}>
                {dailyNotices.map(
                    ({ _id, title, message, startDate, expiryDate }) => {
                        return (
                            <div className={style.item} key={_id}>
                                <input value={_id} type="radio" id={_id} onChange={() => radioHandler(_id)} />

                                {title} {message} {startDate} {expiryDate}
                            </div>
                        )
                    }

                )}

            </div>
        </body>
    )

}