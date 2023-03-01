//imports
import express from "express";
import mongoose from "mongoose";
import Messages from './dbMessages.js';
import Pusher from 'pusher';
import cors from 'cors';


//app config
const app = express();
const port = process.env.PORT || 9001;

const pusher = new Pusher({
    appId: "1554489",
    key: "******",
    secret: "********",
    cluster: "eu",
    useTLS: true
});

//middleware: para que los mensajes se conviertan en json

app.use(express.json());
app.use(cors())

// DB config
const connection_url = 'mongodb+srv://justMe:********@cluster0.gmgez9s.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(connection_url, {
    useUnifiedTopology: true 
})

const db = mongoose.connection

db.once('open',()=>{
    console.log('DB connected');

    const msgCollection = db.collection("messagecontents"); 
    const changeStream = msgCollection.watch();

    changeStream.on('change',(change)=>{
        console.log(change);

        if(change.operationType=== 'insert'){
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted',
            {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received
            }
        );
        } else {
            console.log('Error triggering Pusher');
        }
    })

})


// ??????


// api routes
app.get('/',(req, res)=> res.status(200).send('Demo'));

app.get('/messages/sync', (req, res) => {
    Messages.find((err, data) => {
        if(err){
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    });
});


app.post('/messages/new', (req, res) => {
    const dbMessage = req.body

    Messages.create(dbMessage, (err, data) => {
        if(err){
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    });
});

//listen
app.listen(port, () => console.log(`Listening on localhost: ${port}`));
// npm start ---> Listening on localhost: 9000
