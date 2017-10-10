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

socket.on('createMessage', (message) => {
  console.log('New message', message)
  io.emit('newMessage', {
    from: message.from,
    text: message.text,
    createdAt: new Date().getTime()
  })
})

socket.on('disconnect', () => {
  console.log('client is disconnected')
})
})
server.listen(port, () => {
  console.log(`running on port ${port}`)
})
