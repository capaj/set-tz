const execSync = require('child_process').execSync
const os = require('os')

module.exports = (TZ) => {
  if (os.platform() === 'win32') {
    const previousTZ = execSync('tzutil /g').toString()
    const cleanup = () => {
      execSync(`tzutil /s "${previousTZ}"`)
      console.log(`timezone was restored to ${previousTZ}`)
    }
    execSync(`tzutil /s "${TZ}"`)
    console.log(`timezone changed, if process is killed, run manually: tzutil /s ${previousTZ}`)

    process.on('exit', cleanup)
    process.on('SIGINT', function () {
      process.exit(2)
    })
  } else {
    process.env.TZ = TZ
  }
}
