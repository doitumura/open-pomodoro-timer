class Dispatcher {
  constructor() {
    this.argv = require("minimist")(process.argv.slice(2));
    this.subCommand = this.argv["_"][0];
  }

  dispatch = () => {
    const Setting = require('./setting.js');
    const setting = new Setting(this.argv);

    switch(this.subCommand) {
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
        console.log("no subcommand entered")
    }
  }
}

module.exports = Dispatcher;
