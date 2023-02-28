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

const overwriteSettings = async (option, abbreviatedOption) => {
  let settingsJson = await JSON.parse(fs.readFileSync(SETTINGS_SAVE_PATH, "utf8"));
  settingsJson[option] = argv[option] ? argv[option] : argv[abbreviatedOption];
  fs.writeFileSync(SETTINGS_SAVE_PATH, JSON.stringify(settingsJson), "utf8");
}

const argv = require("minimist")(process.argv.slice(2));
if(argv["_"][0] == "default") {
  fs.writeFileSync(SETTINGS_SAVE_PATH, JSON.stringify(DEFAULT_SETTINGS), "utf8");
}

if(argv["_"][0] == "set") {
  if(argv["focus"] || argv["f"]) {
    overwriteSettings("focus", "f");
  }
  if(argv["break"] || argv["b"]) {
    overwriteSettings("break", "b");
  }
  if(argv["longbreak"] || argv["lb"]) {
    overwriteSettings("longbreak", "lb");
  }
  if(argv["cycle"] || argv["c"]) {
    overwriteSettings("cycle", "c");
  }
  if(argv["focusApp"] || argv["fa"]) {
    overwriteSettings("focusApp", "fa");
  }
  if(argv["focusUrl"] || argv["fu"]) {
    overwriteSettings("focusUrl", "fu");
  }
  if(argv["breakApp"] || argv["ba"]) {
    overwriteSettings("breakApp", "ba");
  }
  if(argv["breakUrl"] || argv["bu"]) {
    overwriteSettings("breakUrl", "bu");
  }
  if(argv["longbreakUrl"] || argv["lu"]) {
    overwriteSettings("longbreakUrl", "lu");
  }
  if(argv["longbreakApp"] || argv["la"]) {
    overwriteSettings("longbreakApp", "la");
  }
  if(argv["browser"] || argv["br"]) {
    overwriteSettings("browser", "br");
  }
}

if(argv["_"][0] == "settings") {
  if(fs.existsSync(SETTINGS_SAVE_PATH)) {
    console.log(JSON.parse(fs.readFileSync(SETTINGS_SAVE_PATH, "utf8")));
  } else {
    console.log(DEFAULT_SETTINGS);
  }
}

if(argv["_"][0] == "start") {
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

