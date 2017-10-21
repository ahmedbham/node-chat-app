var socket = io()

function scrollToBottom () {
  var messages = jQuery('#messages')
  var newMessage = messages.children('li:last-child')
  var clientHeight = messages.prop('clientHeight')
  var scrollTop = messages.prop('scrollTop')
  var scrollHeight = messages.prop('scrollHeight')
  var newMessageHeight = newMessage.innerHeight()
  var lastMessageHeight = newMessage.prev().innerHeight()

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight>= scrollHeight) {
    messages.scrollTop(scrollHeight)
  }
}

socket.on('connect', function () {

  var params = jQuery.deparam(window.location.search)

  socket.emit('join', params, function (err) {
    if(err) {
      alert(err)
      window.location.href = '/'
    } else {
      console.log('no error')
    }
  })
  console.log('connected to server')
})

socket.on('disconnect', function () {
  console.log('disconnected from server')
})

socket.on('updateUserList', function (users) {
  var ol = jQuery('<ol></ol>')

  users.forEach(function (user) {
    ol.append(jQuery('<li></li>').text(user))
  })
  jQuery('#users').html(ol)
})

socket.on('newMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a')
  var template = jQuery('#message-template').html()
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  })
  jQuery('#messages').append(html)
  scrollToBottom()

  // console.log('new message arrived',message)
  // var formattedTime = moment(message.createdAt).format('h:mm a')
  // var li = jQuery('<li></li>')
  // li.text(`${message.from} ${formattedTime}: ${message.text}`)
  // jQuery('#messages').append(li)
})

socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a')
  var template = jQuery('#location-message-template').html()
  var html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  })
  // var li = jQuery('<li></li>')
  // var a = jQuery('<a target="_blank">my current location</a>')
  // li.text(`${message.from} ${formattedTime}: `)
  // a.attr('href', message.url)
  // li.append(a)
  jQuery('#messages').append(html)
  scrollToBottom()
})

var messageTextbox = jQuery('[name=message]')
jQuery('#message-form').on('submit', function (e) {
  e.preventDefault()
  socket.emit('createMessage', {
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('')
  })
})

var buttonLocation = jQuery('#location-button')
buttonLocation.on('click', function () {
  if (!navigator.geolocation) return alert('your broswer dont support geolocation')

  buttonLocation.attr('disabled', 'disabled').text('Sending location...')
  navigator.geolocation.getCurrentPosition(function (position) {
    buttonLocation.removeAttr('disabled').text('Send location')
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }, function () {})
  }, function () {
    alert('unable to get location')
    buttonLocation.removeAttr('disabled').text('Send location')
  })
})
