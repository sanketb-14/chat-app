const express = require('express')
const path = require('path')


const router = express.Router()

router.get('/chat' , (req,res) => {
    const filePath = path.join(__dirname, '..' ,'/views', 'chat.html')
    res.sendFile(filePath)
})

module.exports = router