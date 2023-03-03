class Setting {
  static fs = require("fs");
  static SETTINGS_SAVE_PATH = "settings.json";
  static DEFAULT_SETTINGS = {
    focus: 25,
    break: 5,
    longbreak: 15,
    cycle: 4,
    focusApp: "",
    focusUrl: "",
    breakApp: "",
    breakUrl: "",
    longbreakApp: "",
    longbreakUrl: "",
  };
  static ALL_OPTIONS = [
    "focus",
    "f",
    "break",
    "b",
    "longbreak",
    "lb",
    "cycle",
    "c",
    "focusApp",
    "fa",
    "focusUrl",
    "fu",
    "breakApp",
    "ba",
    "breakUrl",
    "bu",
    "longbreakApp",
    "la",
    "longbreakUrl",
    "lu",
    "default",
    "d",
  ];

  constructor(option) {
    this.option = option;

    if (Setting.fs.existsSync(Setting.SETTINGS_SAVE_PATH)) {
      this.settingsJson = JSON.parse(
        Setting.fs.readFileSync(Setting.SETTINGS_SAVE_PATH, "utf8")
      );
    } else {
      this.settingsJson = Setting.DEFAULT_SETTINGS;
    }
  }

  setOptionValue = () => {
    if (this.#isInvalidOption(Object.assign({}, this.option))) {
      console.error("invalid option is contained");
      return;
    }

    if (!Object.keys(this.option).length) {
      console.error("enter option");
      return;
    }

    if (this.option["focus"] || this.option["f"]) {
      if (!this.#checkTimerOptionValid("focus")) return;
      this.#overwriteValue("focus", "f");
    }
    if (this.option["break"] || this.option["b"]) {
      if (!this.#checkTimerOptionValid("break")) return;
      this.#overwriteValue("break", "b");
    }
    if (this.option["longbreak"] || this.option["lb"]) {
      if (!this.#checkTimerOptionValid("longbreak")) return;
      this.#overwriteValue("longbreak", "lb");
    }
    if (this.option["cycle"] || this.option["c"]) {
      if (!this.#checkOptionTypeValid("number", "cycle")) return;
      this.#overwriteValue("cycle", "c");
    }
    if (this.option["focusApp"] || this.option["fa"]) {
      if (!this.#checkOptionTypeValid("string", "focusApp")) return;
      this.#overwriteValue("focusApp", "fa");
    }
    if (this.option["focusUrl"] || this.option["fu"]) {
      if (!this.#checkOptionTypeValid("string", "focusUrl")) return;
      this.#overwriteValue("focusUrl", "fu");
    }
    if (this.option["breakApp"] || this.option["ba"]) {
      if (!this.#checkOptionTypeValid("string", "breakApp")) return;
      this.#overwriteValue("breakApp", "ba");
    }
    if (this.option["breakUrl"] || this.option["bu"]) {
      if (!this.#checkOptionTypeValid("string", "breakUrl")) return;
      this.#overwriteValue("breakUrl", "bu");
    }
    if (this.option["longbreakUrl"] || this.option["lu"]) {
      if (!this.#checkOptionTypeValid("string", "longbreakUrl")) return;
      this.#overwriteValue("longbreakUrl", "lu");
    }
    if (this.option["longbreakApp"] || this.option["la"]) {
      if (!this.#checkOptionTypeValid("string", "longbreakApp")) return;
      this.#overwriteValue("longbreakApp", "la");
    }
    if (this.option["default"] || this.option["d"]) {
      Setting.fs.writeFileSync(
        Setting.SETTINGS_SAVE_PATH,
        JSON.stringify(Setting.DEFAULT_SETTINGS),
        "utf8"
      );
    }
  };

  print = () => {
    console.log(this.settingsJson);
  };

  #isInvalidOption = (option) => {
    Setting.ALL_OPTIONS.forEach((removeProperty) => {
      delete option[removeProperty];
    });

    return Object.keys(option).length ? true : false;
  };

  #checkTimerOptionValid = (timerType) => {
    if (this.option[timerType] && typeof this.option[timerType] !== "number") {
      console.error(`enter a number for the ${timerType} option`);
      return false;
    }

    const head = timerType.slice(0, 1);
    if (this.option[head] && typeof this.option[head] !== "number") {
      console.error(`enter a number for the ${timerType} option`);
      return false;
    }

    if (this.option[timerType] < 1 || this.option[head] < 1) {
      console.error("less than 1 minute cannot be set");
      return false;
    }

    return true;
  };

  #checkOptionTypeValid(validType, option) {
    if (typeof this.option[option] !== validType) {
      console.error(`enter a ${validType} for ${option} option`);
      return false;
    }

    return true;
  }

  #overwriteValue = async (option, abbreviatedOption) => {
    let settingsJson = this.settingsJson;
    settingsJson[option] = this.option[option]
      ? this.option[option]
      : this.option[abbreviatedOption];
    Setting.fs.writeFileSync(
      Setting.SETTINGS_SAVE_PATH,
      JSON.stringify(settingsJson),
      "utf8"
    );
  };
}

module.exports = Setting;
