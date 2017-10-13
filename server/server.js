const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const {generateMessage} = require('./utils/message')

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

  var welcomeMsg = generateMessage('Admin', 'welcome new users')
  var newUserbroadcastMsg = generateMessage('Admin', 'new user joined')
  socket.emit('newMessage', welcomeMsg)
  socket.broadcast.emit('newMessage', newUserbroadcastMsg)

socket.on('createMessage', (message, callback) => {
  console.log('New message', message)
  callback('this is from server')
  io.emit('newMessage', generateMessage(message.from, message.text))
})

socket.on('disconnect', () => {
  console.log('client is disconnected')
})
})
server.listen(port, () => {
  console.log(`running on port ${port}`)
})
