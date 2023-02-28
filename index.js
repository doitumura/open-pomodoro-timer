const fs = require("fs");

let settingsJson;
if(fs.existsSync("settings.json")) {
  settingsJson = JSON.parse(fs.readFileSync("settings.json", "utf8"));
} else {
  settingsJson = {
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
  fs.writeFileSync("settings.json", JSON.stringify(settingsJson), "utf8");
}

const PomodoroTimer = require("./pomodoro-timer.js");
const pomodoroTimer = new PomodoroTimer(settingsJson);
pomodoroTimer.start();
