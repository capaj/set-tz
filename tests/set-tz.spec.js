const test = require('ava')
const setTZ = require('../index')

test('sets the timezone', (t) => {
  setTZ('UTC')

  if (process.platform === 'win32') {
    t.is(
      new Date().toString().includes(' GMT+0000 (Greenwich Mean Time)'),
      true
    )
  } else {
    t.is(
      new Date().toString().includes(' GMT+0000 (Coordinated Universal Time)'),
      true
    )
  }
})

test('throws', (t) => {
  const dateString = new Date().toString()
  const beforeTZ = dateString.substr(dateString.indexOf('GMT'))
  t.throws(() => {
    setTZ('not a valid tz')
  })
  t.is(new Date().toString().includes(beforeTZ), true)
})
