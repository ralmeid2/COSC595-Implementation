import style from './Add.module.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Message, Header, AdminMenu } from '../components'
import { post, get } from '../utils/http'
import { DailyNotice } from '../types/DailyNotice'
import AdminOptions from './AdminOptions'



export default function Admin(){
    

    return (
      <div>
        <AdminMenu />
       </div>
       
      )

}