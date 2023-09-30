import { PhotoUploader } from '../components'
import { Header, AdminMenu } from '../components'

import styles from './Admin.module.css'

/**
 * The Photo page
 * Route: /photo
 * Accessed by admins only
 * Can upload photos, remove existing ones, and add a category to a photo
 */
export default function Photo() {

    return (
        <div className={styles.adminPage}>
                <AdminMenu />
                <PhotoUploader />
        </div>
    )
}
