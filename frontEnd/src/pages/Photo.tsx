import { PhotoUploader } from '../components'
import { Header, AdminMenu } from '../components'

import styles from './Admin.module.css'

export default function Photo() {

    return (
        <div className={styles.adminPage}>
                <AdminMenu />
                <PhotoUploader />
        </div>
    )
}

