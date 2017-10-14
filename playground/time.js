var moment = require('moment')

var sometime = moment().valueOf()
console.log(sometime)

var date = moment()
// date.add(1, 'year')
console.log(date.format('h:mm a'))
