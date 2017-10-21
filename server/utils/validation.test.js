const expect = require('expect')

var {isRealString} = require('./validation')

describe('isRealString', () => {
  it('should fail non-string values', () =>  {
    var str = 1234
    expect(isRealString(str)).toBeFalsy()
  })
  it('should fail  empty string values', () =>  {
    var str = '  '
    expect(isRealString(str)).toBeFalsy()
  })
  it('should pass valid string values', () =>  {
    var str = '1234'
    expect(isRealString(str)).toBeTruthy()
  })
})
