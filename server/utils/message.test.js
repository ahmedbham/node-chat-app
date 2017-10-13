const expect  =require('expect')

var {generateMessage, generateLocationMessage} = require('./message')

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'Admin'
    var text = 'welcome new users'
    var welcomeMsg = generateMessage(from, text)
    expect(welcomeMsg.from).toBe(from)
    expect(welcomeMsg.text).toBe(text)
    expect(welcomeMsg.createdAt).toBeTruthy()
  })
})

describe('generateLocationMessage', () => {
  it('should generate correct location message object', () => {
    var from = 'Admin'
    var lat = 33.870438
    var long = -84.1442717
    var url = `https://www.google.com/maps?q=${lat},${long}`
    var locMsg = generateLocationMessage(from, lat, long)
    expect(locMsg.from).toBe(from)
    expect(locMsg.url).toBe(url)
    expect(locMsg.createdAt).toBeTruthy()
  })
})
