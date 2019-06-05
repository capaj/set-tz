import test from 'ava'
import setTZ from '../index'

test('sets the timezone', (t) => {
  setTZ('UTC')
  t.is(
    new Date().toString().includes(' GMT+0000 (Coordinated Universal Time)'),
    true
  )
})

test('throws', (t) => {
  const dateString = new Date().toString()
  const beforeTZ = dateString.substr(dateString.indexOf('GMT'))
  t.throws(() => {
    setTZ('not a valid tz')
  })
  t.is(new Date().toString().includes(beforeTZ), true)
})
