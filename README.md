# set-tz

sets the timezone for your node.js process across all OSes

## sample usage

```javascript
const setTZ = require('set-tz')
setTZ('UTC')
// that's it
```

It will even convert between operating systems

```javascript
const setTZ = require('set-tz')
setTZ('America/New_York')
```

This will set timezone to America/New_York in non-Windows environments.
In Windows environments, it will set the timezone to Eastern Standard Time (because Windows doesn't respect IANA timezones).

## Jest usage

It is very common you want to run all your tests in UTC no matter which timezone your computer is in. If you need that, then you can use a shortcut:

```
  "jest": {
    "setupFiles": ['set-tz/utc']
  }
```

## Windows caveat

On windows, when you call `setTZ()` it effectively changes your whole OS timezone so beware-if you kill the process, you'll need to manually revert back after you're done-I am assuming you'r process is short-lived. If you don't kill your process, it will revert your original timezone back for you.

On all other OSes, it just sets `process.env.TZ`, so beware that the current process won't have the timezome set. Only it's children.
