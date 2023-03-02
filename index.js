const argv = require("minimist")(process.argv.slice(2));
const subCommand = argv["_"][0];
if(!subCommand) {
  console.error("enter subcommand");
  return;
}

delete argv._;
const option = argv;
const Setting = require('./lib/setting.js');
const setting = new Setting(option);

switch(subCommand) {
  case "set":
    setting.setOptionValue();
    break;
  case "settings":
    setting.print();
    break;
  case "start":
    const PomodoroTimer = require("./lib/pomodoro-timer.js");
    const pomodoroTimer = new PomodoroTimer(setting.settingsJson);
    pomodoroTimer.start();
    break;
  default:
    console.error("no such subcommand")
}
