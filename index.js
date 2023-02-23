const startFocusTimer = async (settingsJson) => {
  console.log("focus");
  setTimeout(startBreakTimer, settingsJson["focus"] * 60 * 1000, settingsJson);
}

const startBreakTimer = async (settingsJson) => {
  console.log("break");
  setTimeout(startFocusTimer, settingsJson["break"] * 60 * 1000, settingsJson);
}

const fs = require("fs");
const settingsJson = JSON.parse(fs.readFileSync("settings.json", "utf8"));

startFocusTimer(settingsJson);
