import './sidebar.css';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import { Avatar, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SidebarChat from '../sidebarChat/SidebarChat';


export default function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='sidebar__header'>
        <div className='sidebar__header-left'>
          <Avatar/> <strong>Me</strong>
        </div>
        <div className='sidebar__header-right'>
          <IconButton>
          <DonutLargeIcon/>
          </IconButton>
          <IconButton>
            <ChatIcon/>
          </IconButton>
          <IconButton>
            <MoreVertIcon/>
          </IconButton>
        </div>
      </div>
      <div className='sidebar__search'>
        <div className='search__container'>
          <IconButton>
            <SearchIcon/>
          </IconButton>
          <input placeholder='Search or start new chat...' type='text'/>
        </div>
      </div>
      <div className='sidebar__chats'>
        <SidebarChat name="Joey" text="How you doin" time="Just now" src="https://www.looper.com/img/gallery/joey-tribbianis-friends-timeline-explained/l-intro-1621866381.jpg"/>
        <SidebarChat name="Phoebe" text="" time="Yesterday" src="https://www.hallofseries.com/wp-content/uploads/2020/01/Immagine-33.png" />
        <SidebarChat name="Rachel" text="That's a great story. Tell it while..." time="Saturday" src="https://img2.rtve.es/im/5625961/?w=900"/>
      </div>
    </div>
  )
}