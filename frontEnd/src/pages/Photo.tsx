import { PhotoUploader } from '../components'
import { Header, AdminMenu } from '../components'

import style from './Photo.module.css'


export default function Photo() {

    return (
        <body>
            <AdminMenu />
            <PhotoUploader />
        </body>
    )
}

