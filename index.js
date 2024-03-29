#!/usr/bin/env node

const argv = require("minimist")(process.argv.slice(2));
const Setting = require("./lib/setting.js");
const PomodoroTimer = require("./lib/pomodoro-timer.js");

const subCommand = argv["_"][0];
delete argv._;
const option = argv;

const setting = new Setting();
const pomodoroTimer = new PomodoroTimer(setting.settingsJson);

switch (subCommand) {
  case undefined:
    console.error("enter subcommand");
    break;
  case "default":
    setting.restoreDefault();
    break;
  case "set":
    setting.setOptionValue(option);
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
