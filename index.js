const execSync = require('child_process').execSync
const os = require('os')

module.exports = (TZ) => {
  if (os.platform() === 'win32') {
    const previousTZ = execSync('tzutil /g').toString()
    const cleanup = () => {
      console.log('clean')
      execSync(`tzutil /s "${previousTZ}"`)
    }
    execSync(`tzutil /s "${TZ}"`)

    process.on('exit', cleanup)
    process.on('SIGINT', function () {
      cleanup()
      process.exit(2)
    })
  } else {
    process.env.TZ = TZ
  }
}
