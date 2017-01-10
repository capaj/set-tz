const execSync = require('child_process').execSync
const os = require('os')

module.exports = (TZ) => {
  if (os.platform() === 'win32') {
    const out = execSync('tzutil /g')
    const previousTZ = out.toString()
    const cleanup = () => {
      execSync(`tzutil /s "${previousTZ}"`)
    }
    execSync(`tzutil /s "${TZ}"`).toString()

    process.on('exit', cleanup)

    process.on('SIGINT', function () {
      cleanup()
      process.exit(2)
    })
  } else {
    process.env.TZ = TZ
  }
}
