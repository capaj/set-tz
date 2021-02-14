const test = require('ava')
const setTZ = require('../index')

test('sets the timezone when the timezone is Windows format', (t) => {
  setTZ('Asia/Shanghai')
  t.is(new Date().toString().includes(' GMT+0800 (China Standard Time)'), true)
})
