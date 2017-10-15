var socket = io()

socket.on('connect', function () {
  console.log('connected to server')
})

socket.on('disconnect', function () {
  console.log('disconnected from server')
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
})

var messageTextbox = jQuery('[name=message]')
jQuery('#message-form').on('submit', function (e) {
  e.preventDefault()
  socket.emit('createMessage', {
    from: 'User',
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
