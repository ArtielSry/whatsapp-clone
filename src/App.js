import { useEffect, useState } from 'react';
import './App.css';

import Chat from './components/chat/Chat';
import Sidebar from './components/sidebar/Sidebar.jsx';

import Pusher from 'pusher-js';
import axios from './axios';

function App() {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('/messages/sync').then(response => {
      setMessages(response.data)
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher('4637347ccdca3ff5fdf5', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      setMessages([...messages, newMessage])
    });  
    
    return ()=> {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);



  console.log(messages);

  return (
    <div className="App">
      <div className='container__body'>
        <Sidebar />
        <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;
