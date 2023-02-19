import React from 'react';
import './chat.css'
import { useState } from 'react';

import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined } from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import MicIcon from '@mui/icons-material/Mic';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import axios from "../../axios"

function Chat({ messages }) {

  const [input, setInput] = useState("");
  
  const sendMessage = async (e) => {
    e.preventDefault();

    await axios.post('/messages/new',{
      message: input,
      name: "",
      timestamp: new Date().toUTCString(),
      received: true,
    });

    setInput('');
  };


  return (
    <div className='chat'>
      <div className='chat__header'>
        <Avatar src="https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2016/07/poster-friends.jpg?itok=fLzwNnjz"/>

        <div className='chat__header-info'>
          <h3>Friends</h3>
          <p>Last seen just now</p>
        </div>
        <div className='chat__header-right'>
          <IconButton> 
            <SearchOutlined/>
          </IconButton>
          <IconButton>
            <AttachFile/>
          </IconButton>
          <IconButton>
            <MoreVert/>
          </IconButton>
        </div>
      </div>

      <div className='chat__body'>
        { messages.map((message)=> (
          <p className={`chat__message ${message.received && "chat__reciever"}`}>
          <span className='chat__name'>{message.name}</span> 
          {message.message} 
          <span className='chat__timestamp'>{message.timestamp}</span>
        </p>
        ))}
      </div>

      <div className='chat__footer'>
          <InsertEmoticon/>
        <form>
          <input
            value={input}
            onChange={ (e) => setInput(e.target.value)}
            placeholder="Type a message..."
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            <IconButton><ArrowForwardIosIcon/></IconButton>
          </button>
        </form>
        <MicIcon/>
      </div>
    </div>
  )
}

export default Chat;