const fs = require("fs");

class Setting {
  static SETTINGS_SAVE_PATH = `${__dirname}/settings.json`;
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
  ];

  static TIMER_OPTION_MAX_INDEX = 5;
  static CYCLE_OPTION_INDEX = 6;
  static C_OPTION_INDEX = 7;

  constructor() {
    if (fs.existsSync(Setting.SETTINGS_SAVE_PATH)) {
      this.settingsJson = JSON.parse(
        fs.readFileSync(Setting.SETTINGS_SAVE_PATH, "utf8")
      );
    } else {
      this.settingsJson = Setting.DEFAULT_SETTINGS;
    }
  }

  restoreDefault = () => {
    this.settingsJson = Setting.DEFAULT_SETTINGS;
    fs.writeFileSync(
      Setting.SETTINGS_SAVE_PATH,
      JSON.stringify(this.settingsJson),
      "utf8"
    );
  };

  setOptionValue = (options) => {
    if (this.#isInvalidOption(Object.assign({}, options))) {
      console.error("invalid option is contained");
      return;
    }

    if (!Object.keys(options).length) {
      console.error("enter option");
      return;
    }

    for (let i = 0; i < Setting.ALL_OPTIONS.length; i++) {
      const targetOption = Setting.ALL_OPTIONS[i];
      if (!(targetOption in options)) continue;

      if (i <= Setting.TIMER_OPTION_MAX_INDEX) {
        if (!this.#checkTimerOptionValid(options, targetOption)) return;
      } else if (
        i === Setting.CYCLE_OPTION_INDEX ||
        i === Setting.C_OPTION_INDEX
      ) {
        if (!this.#checkOptionTypeNum(options, targetOption)) return;
      } else {
        if (!this.#checkOptionTypeString(options, targetOption)) return;
      }

      if (i % 2 == 0) {
        this.settingsJson[targetOption] = options[targetOption];
      } else {
        this.settingsJson[Setting.ALL_OPTIONS[i - 1]] = options[targetOption];
      }
    }

    fs.writeFileSync(
      Setting.SETTINGS_SAVE_PATH,
      JSON.stringify(this.settingsJson),
      "utf8"
    );
  };

  print = () => {
    console.log(this.settingsJson);
  };

  #isInvalidOption = (options) => {
    Setting.ALL_OPTIONS.forEach((removeProperty) => {
      delete options[removeProperty];
    });

    return Object.keys(options).length ? true : false;
  };

  #checkTimerOptionValid = (options, targetOption) => {
    if (!this.#checkOptionTypeNum(options, targetOption)) return false;

    if (options[targetOption] < 1) {
      console.error("less than 1 minute cannot be set");
      return false;
    }

    return true;
  };

  #checkOptionTypeNum(options, targetOption) {
    if (typeof options[targetOption] !== "number") {
      console.error(`enter a number for the ${targetOption} option`);
      return false;
    }

    return true;
  }

  #checkOptionTypeString(options, targetOption) {
    if (typeof options[targetOption] !== "string") {
      console.error(`enter a string for the ${targetOption} option`);
      return false;
    }

    return true;
  }
}

module.exports = Setting;
