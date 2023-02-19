import { Avatar } from '@mui/material'
import './sidebarChat.css'

export default function SidebarChat({ name, text, src, time }) {

  return (
    <div className='sidebarChat'>
      <Avatar src={src} />
      <div className='sidebarChat__info'>
        <h3>{name}</h3>
        <p>{text}</p>
        <strong>{time}</strong>
      </div>
    </div>
  )
}
