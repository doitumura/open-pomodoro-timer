## Features

- activates a command line tool when a timer ends and asks if it should start the next timer
- can be specified the timer time
- can be specified the number of focus until entering longbreak
- can be specified the app and URL to open when the timer ends

<strong> Operation has been confirmed only on macOS and Terminal, iTerm2, Hyper</strong>

### Installation

```
npm install -g open-pomodoro-timer
```

### Usage

```
opomo [subcommand] [options]
```

### Subcommand

```
settings       Check current settings
start          Start Pomodoro timer with current settings
default        Restore settings to default
set [options]  Change the setting with the value specified in the option
```

### Options

```
-f, --focus [n]           Focus timer minutes (default: 25)
-b, --break [n]           Break timer minutes (default: 5)
--lb, --longbreak [n]     Long break timer minutes (default: 15)
-c, --cycle [n]           How many times to focus until long break (default: 4)
--fa, --focusApp [s]      App to open when focus timer starts (default: "")
--fu, --focusUrl [s]      Url to open when focus timer starts (default: "")
--ba, --breakApp [s]      App to open when break timer starts (default: "")
--bu, --breakUrl [s]      Url to open when break timer starts (default: "")
--la, --longbreakApp [s]  App to open when long break timer starts (default: "")
--lu, --longbreakUrl [s]  Url to open when long break timer starts (default: "")

* include the official name of the app in the app string
* If cycle is 1, focus and longbreak are alternately repeated
* If cycle is 0, focus and break are repeated alternately
```

### Example

```
$ opomo settings
{
  focus: 25,
  break: 5,
  longbreak: 15,
  cycle: 4,
  focusApp: '',
  focusUrl: '',
  breakApp: '',
  breakUrl: '',
  longbreakApp: '',
  longbreakUrl: ''
}
$ opomo set -f 10 -b 10
$ opomo set --fa "Visual Studio Code"
$ opomo settings
{
  focus: 10,
  break: 10,
  longbreak: 15,
  cycle: 4,
  focusApp: 'Visual Studio Code',
  focusUrl: '',
  breakApp: '',
  breakUrl: '',
  longbreakApp: '',
  longbreakUrl: ''
}
$ opomo start

* If you want to stop the timer in the middle, press ctrl+c
```
