const argv = require("minimist")(process.argv.slice(2));
const subCommand = argv["_"][0];
if(!subCommand) {
  console.log("enter subcommand");
  return;
}

const Setting = require('./setting.js');
const setting = new Setting(argv);

switch(subCommand) {
  case "default":
    setting.restoreDefaultValue();
    break;
  case "set":
    setting.setOptionValue();
    break;
  case "settings":
    setting.print();
    break;
  case "start":
    const PomodoroTimer = require("./pomodoro-timer.js");
    const pomodoroTimer = new PomodoroTimer(setting.settingsJson);
    pomodoroTimer.start();
    break;
  default:
    console.log("no such subcommand")
}
