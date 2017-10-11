const expect  =require('expect')

var {generateMessage} = require('./message')

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
