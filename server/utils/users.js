class Users {
  constructor () {
    this.users = []
  }

  addUser (id, name, room) {
    var user = {id, name, room}
    this.users.push(user)
    return this.users
  }

  removeUser (id) {
    var user = this.getUser(id);

    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    }

    return user;
  }

  getUser (id) {
    return this.users.filter((user) => user.id === id)[0]
  }

  getUserList (room) {
    var users = this.users.filter((user) => user.room === room)
    var userArray = users.map((user) => user.name)
    return userArray
  }
}

module.exports = {Users}
