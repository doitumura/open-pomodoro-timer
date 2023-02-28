const fs = require("fs");
const settingsJson = JSON.parse(fs.readFileSync("settings.json", "utf8"));

const PomodoroTimer = require("./pomodoro-timer.js");
const pomodoroTimer = new PomodoroTimer(settingsJson);
pomodoroTimer.start();
