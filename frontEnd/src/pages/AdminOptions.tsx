import { Options, AdminMenu, PointsForm } from '../components'
import style from './Admin.module.css'

/**
 * Can choose the type of display mode, what to display, and can update the current house points
 * Route: /admin-options
 */
export default function AdminOptions() {

    return (
        <div className = {style.adminPage} >
            <AdminMenu />
            <Options />
            <PointsForm />
        </div>
    )
}
