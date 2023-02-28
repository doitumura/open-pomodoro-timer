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
  constructor(argv) {
    this.argv = argv;

    if(fs.existsSync(SETTINGS_SAVE_PATH)) {
      this.settingsJson = JSON.parse(fs.readFileSync(SETTINGS_SAVE_PATH, "utf8"));
    } else {
      this.settingsJson = DEFAULT_SETTINGS;
    }
  }

  setOptionValue = () => {
    let argv = this.argv;
    if(!Object.keys(argv).length) {
      console.log("enter option");
    }
    if(argv["focus"] || argv["f"]) {
      this.#overwriteValue("focus", "f");
    }
    if(argv["break"] || argv["b"]) {
      this.#overwriteValue("break", "b");
    }
    if(argv["longbreak"] || argv["lb"]) {
      this.#overwriteValue("longbreak", "lb");
    }
    if(argv["cycle"] || argv["c"]) {
      this.#overwriteValue("cycle", "c");
    }
    if(argv["focusApp"] || argv["fa"]) {
      this.#overwriteValue("focusApp", "fa");
    }
    if(argv["focusUrl"] || argv["fu"]) {
      this.#overwriteValue("focusUrl", "fu");
    }
    if(argv["breakApp"] || argv["ba"]) {
      this.#overwriteValue("breakApp", "ba");
    }
    if(argv["breakUrl"] || argv["bu"]) {
      this.#overwriteValue("breakUrl", "bu");
    }
    if(argv["longbreakUrl"] || argv["lu"]) {
      this.#overwriteValue("longbreakUrl", "lu");
    }
    if(argv["longbreakApp"] || argv["la"]) {
      this.#overwriteValue("longbreakApp", "la");
    }
    if(argv["browser"] || argv["br"]) {
      this.#overwriteValue("browser", "br");
    }
    if(argv["default"] || argv["d"]) {
      fs.writeFileSync(SETTINGS_SAVE_PATH, JSON.stringify(DEFAULT_SETTINGS), "utf8");
    }

    ALL_OPTIONS.forEach(removeProperty => {
      delete argv[removeProperty];
    });

    if(Object.keys(argv).length) {
      console.log("no such option");
    }
  }

  print = () => {
    console.log(this.settingsJson);
  }

  #overwriteValue = async (option, abbreviatedOption) => {
    let settingsJson = this.settingsJson;
    settingsJson[option] = this.argv[option] ? this.argv[option] : this.argv[abbreviatedOption];
    fs.writeFileSync(SETTINGS_SAVE_PATH, JSON.stringify(settingsJson), "utf8");
  }
}

module.exports = Setting;
