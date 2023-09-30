import { useState, useCallback, useEffect } from 'react'
import { AdminMenu } from '../components'
import { del, get } from '../utils/http'
import { DailyNotice } from '../types/DailyNotice'
import styles from './Delete.module.css'
import style from './Admin.module.css'

/**
 * Can delete a daily notice from the database
 * Route: /delete
 */
export default function Delete() {
    const [dailyNotices, setDailyNotices] = useState<DailyNotice[]>([])

    useEffect(() => {
        fetchDailyNotices()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
        <div className={style.adminPage}>
            <AdminMenu />
            <div className={styles.list} >
                <h1>Please Click on an Item to Delete it</h1>
                {dailyNotices.map(
                    ({ _id, title, message, startDate, expiryDate }) => {
                        return (
                            <div className={styles.item} key={_id} onClick={() => deleteHandler(_id)}>
                                <span >
                                    {title} {message}
                                </span>
                            </div>
                        )
                    }
                )}
            </div>
        </div>
    )
}
