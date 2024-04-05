const express = require('express')
const path = require('path')
const fs = require('fs')


const router = express.Router()


router.get('/',(req , res) => {
    const filePath = path.join(__dirname,'..','views','login.html')

    res.sendFile(filePath)
})

router.post('/login', (req, res) => {
    const {username} = req.body
    if(username){
        fs.writeFileSync(path.join(__dirname, '..','data' , 'username.txt'),username)
        res.redirect('/chat')
    }
    else{
        res.status(400).send("username required")
    }

})

router.get('/chat', (req, res) => {
    const username = fs.readFileSync(path.join(__dirname, '..','data', 'username.txt'))
    const chat = fs.readFileSync(path.join(__dirname, '..', "data" , "chatlog.txt"))
    

    if(username && chat){
        
        
        res.send(`<div class="chat-container">
        <h1>${username}:- </br> Your Chat</h1>
        <div class="chat-messages">
           
        </div>
        <form class="chat-input" action="/chat" method="POST">
            <input type="text" id="messageInput" placeholder="Type your message">
            <button type="submit" id="sendButton">Send</button>
        </form>
    </div>`);
    }
    else {
        res.redirect('/');
    }
})
router.post('/chat', (req, res) => {
    const { chat } = req.body;
    console.log(chat);
    if (message) {
        
        fs.appendFileSync(path.join(__dirname, '..', 'data', 'chatlog.txt'), `${chat}\n`);
        res.status(200).send('Message sent successfully.');
    } else {
        res.status(400).send('Message is required.');
    }
});

module.exports = router