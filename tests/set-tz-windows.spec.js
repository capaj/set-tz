import test from 'ava'
import setTZ from '../index'

test('sets the timezone when the timezone is IANA format', (t) => {
  setTZ('China Standard Time')
  t.is(new Date().toString().includes(' GMT+0800 (China Standard Time)'), true)
})
