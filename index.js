const execSync = require('child_process').execSync
const os = require('os')
const ianaWin = require('windows-iana')

module.exports = (TZ) => {
  let winTz
  let ianaTz
  if (TZ !== 'UTC') {
    winTz = ianaWin.findWindows(TZ)
    ianaTz = ianaWin.findOneIana(TZ)

    if (!winTz && !ianaTz) {
      throw new Error(
        `The timezone - ${TZ} - does not exist. Please provide a valid Windows or IANA time.`
      )
    }
  }

  if (os.platform() === 'win32') {
    const previousTZ = execSync('tzutil /g').toString()
    const cleanup = () => {
      execSync(`tzutil /s "${previousTZ}"`)
      console.log(`timezone was restored to ${previousTZ}`)
    }
    execSync(`tzutil /s "${winTz || TZ}"`)
    console.warn(
      `timezone changed, if process is killed, run manually: tzutil /s "${previousTZ}"`
    )

    process.on('exit', cleanup)
    process.on('SIGINT', function() {
      process.exit(2)
    })
  } else {
    process.env.TZ = ianaTz || TZ
  }
}
