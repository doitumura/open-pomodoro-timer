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
const ALL_OPTIONS = [
  "focus", "f", "break", "b", "longbreak", "lb", "cycle", "c", "focusApp", "fa", "focusUrl", "fu",
  "breakApp", "ba", "breakUrl", "bu", "longbreakApp", "la", "longbreakUrl", "lu", "browser", "br",
  "default", "d"
];

class Setting {
  constructor(option) {
    this.option = option;

    if(fs.existsSync(SETTINGS_SAVE_PATH)) {
      this.settingsJson = JSON.parse(fs.readFileSync(SETTINGS_SAVE_PATH, "utf8"));
    } else {
      this.settingsJson = DEFAULT_SETTINGS;
    }
  }

  setOptionValue = () => {
    if(!Object.keys(this.option).length) {
      console.log("enter option");
    }
    if(this.option["focus"] || this.option["f"]) {
      this.#overwriteValue("focus", "f");
    }
    if(this.option["break"] || this.option["b"]) {
      this.#overwriteValue("break", "b");
    }
    if(this.option["longbreak"] || this.option["lb"]) {
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
      fs.writeFileSync(SETTINGS_SAVE_PATH, JSON.stringify(DEFAULT_SETTINGS), "utf8");
    }

    ALL_OPTIONS.forEach(removeProperty => {
      delete this.option[removeProperty];
    });

    if(Object.keys(this.option).length) {
      console.log("no such option");
    }
  }

  print = () => {
    console.log(this.settingsJson);
  }

  #overwriteValue = async (option, abbreviatedOption) => {
    let settingsJson = this.settingsJson;
    settingsJson[option] = this.option[option] ? this.option[option] : this.option[abbreviatedOption];
    fs.writeFileSync(SETTINGS_SAVE_PATH, JSON.stringify(settingsJson), "utf8");
  }
}

module.exports = Setting;
