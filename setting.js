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

class Setting {
  constructor(argv) {
    this.argv = argv;

    if(fs.existsSync(SETTINGS_SAVE_PATH)) {
      this.settingsJson = JSON.parse(fs.readFileSync(SETTINGS_SAVE_PATH, "utf8"));
    } else {
      this.settingsJson = DEFAULT_SETTINGS;
    }
  }

  restoreDefaultValue = () => {
    fs.writeFileSync(SETTINGS_SAVE_PATH, JSON.stringify(DEFAULT_SETTINGS), "utf8");
  }

  setOptionValue = () => {
    if(this.argv["focus"] || this.argv["f"]) {
      this.#overwriteValue("focus", "f");
    }
    if(this.argv["break"] || this.argv["b"]) {
      this.#overwriteValue("break", "b");
    }
    if(this.argv["longbreak"] || this.argv["lb"]) {
      this.#overwriteValue("longbreak", "lb");
    }
    if(this.argv["cycle"] || this.argv["c"]) {
      this.#overwriteValue("cycle", "c");
    }
    if(this.argv["focusApp"] || this.argv["fa"]) {
      this.#overwriteValue("focusApp", "fa");
    }
    if(this.argv["focusUrl"] || this.argv["fu"]) {
      this.#overwriteValue("focusUrl", "fu");
    }
    if(this.argv["breakApp"] || this.argv["ba"]) {
      this.#overwriteValue("breakApp", "ba");
    }
    if(this.argv["breakUrl"] || this.argv["bu"]) {
      this.#overwriteValue("breakUrl", "bu");
    }
    if(this.argv["longbreakUrl"] || this.argv["lu"]) {
      this.#overwriteValue("longbreakUrl", "lu");
    }
    if(this.argv["longbreakApp"] || this.argv["la"]) {
      this.#overwriteValue("longbreakApp", "la");
    }
    if(this.argv["browser"] || this.argv["br"]) {
      this.#overwriteValue("browser", "br");
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
