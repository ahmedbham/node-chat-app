const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const {generateMessage, generateLocationMessage} = require('./utils/message')
const {isRealString} = require('./utils/validation')
const {Users} = require('./utils/users')

const publicPath = path.join(__dirname, '../public')
var app = express()
var server = http.createServer(app)
var io = socketIO(server)
var users = new Users()

app.use(express.static(publicPath))
const port = process.env.PORT || 3000
//
// io.connect({'forceNew': true})

io.on('connection', (socket) => {
  console.log('new connection made')

  var welcomeMsg = generateMessage('Admin', 'welcome new users')

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('name and room required')
    }
    socket.join(params.room)
    users.removeUser(socket.id)
    users.addUser(socket.id, params.name, params.room)
    io.to(params.room).emit('updateUserList', users.getUserList(params.room))

    socket.emit('newMessage', welcomeMsg)
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin',  `${params.name} has joined`))

    callback()
  })

socket.on('createMessage', (message, callback) => {
  var user = users.getUser(socket.id)
  if(user && isRealString(message.text)) {
    io.to(user.room).emit('newMessage', generateMessage(user.name, message.text))
  }


  callback()
})

socket.on('createLocationMessage', (message, callback) => {
  var user = users.getUser(socket.id)
  if(user) {
    io.to(user.room).emit('newLocationMessage', generateMessage(user.name, message.latitude, message.longitude))
  }
  callback()
})

socket.on('disconnect', () => {
  var user = users.removeUser(socket.id)

  if(user) {
    console.log(`${user.name} has left.`)
    io.to(user.room).emit('updateUserList', users.getUserList(user.room))
    io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left. `))
  }
})
})
server.listen(port, () => {
  console.log(`running on port ${port}`)
})
