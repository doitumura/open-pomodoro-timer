const argv = require("minimist")(process.argv.slice(2));
const subCommand = argv["_"][0];
if(!subCommand) {
  console.log("enter subcommand");
  return;
}

delete argv._;
const option = argv;
const Setting = require('./setting.js');
const setting = new Setting(option);

switch(subCommand) {
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
