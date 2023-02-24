const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const countTimer = (targetMinutes) => {
  return new Promise(async (resolve) => {
    const targetSeconds = targetMinutes * 60;
    let elapsedSeconds = 0;
    while(elapsedSeconds <= targetSeconds) {
      const remainingMinutes = String(Math.floor((targetSeconds - elapsedSeconds) / 60)).padStart(2, '0');
      const remainingSeconds = String((targetSeconds - elapsedSeconds) % 60).padStart(2, '0');
      process.stdout.write(`\r${remainingMinutes}:${remainingSeconds}`);

      await sleep(1000);
      elapsedSeconds++;
    }
    resolve();
  })
}

const startFocusTimer = async (settingsJson) => {
  process.stdout.write("\rfocus");
  await sleep(1000);
  await countTimer(settingsJson["focus"]);
  startBreakTimer(settingsJson);
}

const startBreakTimer = async (settingsJson) => {
  process.stdout.write("\rbreak");
  await sleep(1000);
  await countTimer(settingsJson["break"]);
  startFocusTimer(settingsJson);
}

const fs = require("fs");
const settingsJson = JSON.parse(fs.readFileSync("settings.json", "utf8"));

startFocusTimer(settingsJson);
