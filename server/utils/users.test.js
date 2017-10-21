const expect = require('expect')

const {Users} = require('./users')


describe('users', () => {
  var users
  beforeEach(() => {
    users = new Users()
    users.users = [{
      id: '123',
      name: 'ahmed',
      room: 'room 1'
    }, {
      id: '234',
      name: 'ally',
      room: 'room 2'
    }, {
      id: '345',
      name: 'bham',
      room: 'room 1'
    }]
  })

    it('should add new user', () => {
    var users = new Users()
    var user = {
      id: '123',
      name: 'ahmed',
      room: 'my office'
    }

    var resUser = users.addUser(user.id, user.name, user.room)

    expect(users.users).toEqual([user])
  })

  it('should return names of user in room 1', () => {
    var userNames = users.getUserList('room 1')
    expect(userNames).toEqual(['ahmed', 'bham'])
  })

  it('should return names of user in room 2', () => {
    var userNames = users.getUserList('room 2')
    expect(userNames).toEqual(['ally'])
  })

  it('should remove user id 123', () => {
    var removedUsers = users.removeUser('123')
    expect(removedUsers).toHaveLength(2)
    expect(removedUsers[2]).toBeUndefined()
  })

  it('should not remove user id 999', () => {
    var removedUsers = users.removeUser('999')
    expect(removedUsers).toHaveLength(3)
    // expect(removedUsers[2]).toBeUndefined()
  })

  it('should get user id 123', () => {
    var auser = users.getUser('123')
    expect(auser[0].id).toEqual('123')
  })

  it('should not get user id 999', () => {
    var auser = users.getUser('999')
    expect(auser).toHaveLength(0)
  })
})
