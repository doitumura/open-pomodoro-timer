class Setting {
  static fs = require("fs");
  static SETTINGS_SAVE_PATH = "settings.json";
  static DEFAULT_SETTINGS = {
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
  };
  static ALL_OPTIONS = [
    "focus", "f", "break", "b", "longbreak", "lb", "cycle", "c", "focusApp", "fa", "focusUrl", "fu",
    "breakApp", "ba", "breakUrl", "bu", "longbreakApp", "la", "longbreakUrl", "lu", "browser", "br",
    "default", "d"
  ];

  constructor(option) {
    this.option = option;

    if(Setting.fs.existsSync(Setting.SETTINGS_SAVE_PATH)) {
      this.settingsJson = JSON.parse(Setting.fs.readFileSync(Setting.SETTINGS_SAVE_PATH, "utf8"));
    } else {
      this.settingsJson = Setting.DEFAULT_SETTINGS;
    }
  }

  setOptionValue = () => {
    if(!Object.keys(this.option).length) {
      console.error("enter option");
    }
    if(this.option["focus"] || this.option["f"]) {
      if(this.option["focus"] < 1 || this.option["f"] < 1) {
        console.error("less than 1 minute cannot be set");
        return;
      }

      this.#overwriteValue("focus", "f");
    }
    if(this.option["break"] || this.option["b"]) {
      if(this.option["break"] < 1 || this.option["b"] < 1) {
        console.error("less than 1 minute cannot be set");
        return;
      }

      this.#overwriteValue("break", "b");
    }
    if(this.option["longbreak"] || this.option["lb"]) {
      if(this.option["longbreak"] < 1 || this.option["lb"] < 1) {
        console.error("less than 1 minute cannot be set");
        return;
      }

      this.#overwriteValue("longbreak", "lb");
    }
    if(this.option["cycle"] || this.option["c"]) {
      this.#overwriteValue("cycle", "c");
    }
    if(this.option["focusApp"] || this.option["fa"]) {
      this.#overwriteValue("focusApp", "fa");
    }
    if(this.option["focusUrl"] || this.option["fu"]) {
      this.#overwriteValue("focusUrl", "fu");
    }
    if(this.option["breakApp"] || this.option["ba"]) {
      this.#overwriteValue("breakApp", "ba");
    }
    if(this.option["breakUrl"] || this.option["bu"]) {
      this.#overwriteValue("breakUrl", "bu");
    }
    if(this.option["longbreakUrl"] || this.option["lu"]) {
      this.#overwriteValue("longbreakUrl", "lu");
    }
    if(this.option["longbreakApp"] || this.option["la"]) {
      this.#overwriteValue("longbreakApp", "la");
    }
    if(this.option["browser"] || this.option["br"]) {
      this.#overwriteValue("browser", "br");
    }
    if(this.option["default"] || this.option["d"]) {
      Setting.fs.writeFileSync(Setting.SETTINGS_SAVE_PATH, JSON.stringify(Setting.DEFAULT_SETTINGS), "utf8");
    }

    Setting.ALL_OPTIONS.forEach(removeProperty => {
      delete this.option[removeProperty];
    });

    if(Object.keys(this.option).length) {
      console.error("no such option");
    }
  }

  print = () => {
    console.log(this.settingsJson);
  }

  #overwriteValue = async (option, abbreviatedOption) => {
    let settingsJson = this.settingsJson;
    settingsJson[option] = this.option[option] ? this.option[option] : this.option[abbreviatedOption];
    Setting.fs.writeFileSync(Setting.SETTINGS_SAVE_PATH, JSON.stringify(settingsJson), "utf8");
  }
}

module.exports = Setting;
