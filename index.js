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

const argv = require("minimist")(process.argv.slice(2));
if(argv["_"][0] == "default") {
  fs.writeFileSync(SETTINGS_SAVE_PATH, JSON.stringify(DEFAULT_SETTINGS), "utf8");
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

