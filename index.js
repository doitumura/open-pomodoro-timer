const argv = require("minimist")(process.argv.slice(2));
const subCommand = argv["_"][0];
delete argv._;
const option = argv;

const Setting = require("./lib/setting.js");
const setting = new Setting(option);
const PomodoroTimer = require("./lib/pomodoro-timer.js");
const pomodoroTimer = new PomodoroTimer(setting.settingsJson);

switch (subCommand) {
  case undefined:
    console.error("enter subcommand");
    break;
  case "set":
    setting.setOptionValue();
    break;
  case "settings":
    setting.print();
    break;
  case "start":
    pomodoroTimer.start();
    break;
  default:
    console.error("invalid subcommand");
}
