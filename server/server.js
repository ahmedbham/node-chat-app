const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public')
var app = express()
var server = http.createServer(app)
var io = socketIO(server)
app.use(express.static(publicPath))
const port = process.env.PORT || 3000
//
// io.connect({'forceNew': true})

io.on('connection', (socket) => {
  console.log('new connection made')

socket.emit('newMessage', {
  from: 'ahmed@gmail.com',
  text: 'hey, how  ru ',
  createdAt: 123
})

socket.on('createMessage', (newMessage) => {
  newMessage.createdAt = 234
  console.log('New message', newMessage)
})

socket.on('disconnect', () => {
  console.log('client is disconnected')
})
})
server.listen(port, () => {
  console.log(`running on port ${port}`)
})
