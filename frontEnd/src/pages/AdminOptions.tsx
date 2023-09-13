import { Options, AdminMenu, PointsForm } from '../components'
import style from './Admin.module.css'


export default function AdminOptions() {

    return (
        <div className = {style.adminPage} >
            <AdminMenu />
            <Options />
            <PointsForm />
        </div>
    )
}

