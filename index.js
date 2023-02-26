const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const readline = require("readline");
const printRemainingTime = (targetMinutes) => {
  return new Promise(async (resolve) => {
    const targetSeconds = targetMinutes * 60;
    let elapsedSeconds = 0;
    while(elapsedSeconds < targetSeconds) {
      readline.clearLine(process.stdout);
      const remainingMinutes = String(Math.floor((targetSeconds - elapsedSeconds) / 60)).padStart(2, '0');
      const remainingSeconds = String((targetSeconds - elapsedSeconds) % 60).padStart(2, '0');
      process.stdout.write(`\r${remainingMinutes}:${remainingSeconds}`);

      await sleep(1000);
      elapsedSeconds++;
    }
    resolve();
  })
}

const open = require("open");
const openAppAndWebpage = async (timerType) => {
  if (timerType == "focus") process.stdout.write("\r\x1b[31mfocus");
  if (timerType == "break") process.stdout.write("\r\x1b[32mbreak");
  if (timerType == "longbreak") process.stdout.write("\r\x1b[32mlongbreak");

  open(`page/html/${timerType}.html`);
  await sleep(3000);

  if(settingsJson[`${timerType}App`]) await open.openApp(settingsJson[`${timerType}App`]);
  if(settingsJson[`${timerType}Url`]) await open(settingsJson[`${timerType}Url`]);
  await sleep(1000);
  open.openApp("Terminal");
}

const startFocusTimer = async (settingsJson, cycle) => {
  await openAppAndWebpage("focus");
  await printRemainingTime(settingsJson["focus"]);

  cycle++
  if(settingsJson["cycle"] == 0 || cycle != settingsJson["cycle"]) {
    startBreakTimer(settingsJson, cycle);
  } else {
    startLongbreakTimer(settingsJson);
  }
}

const startBreakTimer = async (settingsJson, cycle) => {
  await openAppAndWebpage("break");
  await printRemainingTime(settingsJson["break"]);
  startFocusTimer(settingsJson, cycle);
}

const startLongbreakTimer = async (settingsJson) => {
  await openAppAndWebpage("longbreak");
  await printRemainingTime(settingsJson["longbreak"]);
  startFocusTimer(settingsJson, 0);
}

const fs = require("fs");
const settingsJson = JSON.parse(fs.readFileSync("settings.json", "utf8"));

startFocusTimer(settingsJson, 0);
