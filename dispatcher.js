const fs = require("fs");

const SETTINGS_SAVE_PATH = "settings.json";

const DEFAULT_SETTINGS = {
  "focus":25,
  "break":5,
  "longbreak":15,
  "cycle":4,
  "focusApp":"",
  "focusUrl":"",
  "breakApp":"",
  "breakUrl":"",
  "longbreakApp":"",
  "longbreakUrl":"",
  "browser":"Google Chrome"
}

class Dispatcher {
  constructor() {
    this.argv = require("minimist")(process.argv.slice(2));
    this.subCommand = this.argv["_"][0];
  }

  dispatch = () => {
    switch(this.subCommand) {
      case "default":
        this.#setDefault();
        break;
      case "set":
        this.#setOptionValue();
        break;
      case "settings":
        this.#printSettings();
        break;
      case "start":
        this.#startPomodorotimer();
        break;
      default:
        console.log("no subcommand entered")
    }
  }

  #setDefault = () => {
    fs.writeFileSync(SETTINGS_SAVE_PATH, JSON.stringify(DEFAULT_SETTINGS), "utf8");
  }

  #setOptionValue = () => {
    if(this.argv["focus"] || this.argv["f"]) {
      this.#overwriteSettings("focus", "f");
    }
    if(this.argv["break"] || this.argv["b"]) {
      this.#overwriteSettings("break", "b");
    }
    if(this.argv["longbreak"] || this.argv["lb"]) {
      this.#overwriteSettings("longbreak", "lb");
    }
    if(this.argv["cycle"] || this.argv["c"]) {
      this.#overwriteSettings("cycle", "c");
    }
    if(this.argv["focusApp"] || this.argv["fa"]) {
      this.#overwriteSettings("focusApp", "fa");
    }
    if(this.argv["focusUrl"] || this.argv["fu"]) {
      this.#overwriteSettings("focusUrl", "fu");
    }
    if(this.argv["breakApp"] || this.argv["ba"]) {
      this.#overwriteSettings("breakApp", "ba");
    }
    if(this.argv["breakUrl"] || this.argv["bu"]) {
      this.#overwriteSettings("breakUrl", "bu");
    }
    if(this.argv["longbreakUrl"] || this.argv["lu"]) {
      this.#overwriteSettings("longbreakUrl", "lu");
    }
    if(this.argv["longbreakApp"] || this.argv["la"]) {
      this.#overwriteSettings("longbreakApp", "la");
    }
    if(this.argv["browser"] || this.argv["br"]) {
      this.#overwriteSettings("browser", "br");
    }
  }

  #printSettings = () => {
    if(fs.existsSync(SETTINGS_SAVE_PATH)) {
      console.log(JSON.parse(fs.readFileSync(SETTINGS_SAVE_PATH, "utf8")));
    } else {
      console.log(DEFAULT_SETTINGS);
    }
  }

  #startPomodorotimer = () => {
    let settingsJson;
    if(fs.existsSync(SETTINGS_SAVE_PATH)) {
      settingsJson = JSON.parse(fs.readFileSync(SETTINGS_SAVE_PATH, "utf8"));
    } else {
      settingsJson = DEFAULT_SETTINGS;
      fs.writeFileSync(SETTINGS_SAVE_PATH, JSON.stringify(settingsJson), "utf8");
    }
  
    const PomodoroTimer = require("./pomodoro-timer.js");
    const pomodoroTimer = new PomodoroTimer(settingsJson);
    pomodoroTimer.start();  
  }

  #overwriteSettings = async (option, abbreviatedOption) => {
    let settingsJson = await JSON.parse(fs.readFileSync(SETTINGS_SAVE_PATH, "utf8"));
    settingsJson[option] = this.argv[option] ? this.argv[option] : this.argv[abbreviatedOption];
    fs.writeFileSync(SETTINGS_SAVE_PATH, JSON.stringify(settingsJson), "utf8");
  }  
}

module.exports = Dispatcher;
