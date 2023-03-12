const readline = require("readline");
const open = require("open");

class PomodoroTimer {
  constructor(settingsJson) {
    this.settingsJson = settingsJson;
  }

  start = () => {
    this.#startFocusTimer(0);
  };

  #startFocusTimer = async (cycle) => {
    await this.#openAppAndWebpage("focus");
    await this.#printRemainingTime(this.settingsJson["focus"]);

    cycle++;
    if (
      this.settingsJson["cycle"] === 0 ||
      cycle !== this.settingsJson["cycle"]
    ) {
      this.#startBreakTimer(cycle);
    } else {
      this.#startLongbreakTimer();
    }
  };

  #startBreakTimer = async (cycle) => {
    await this.#openAppAndWebpage("break");
    await this.#printRemainingTime(this.settingsJson["break"]);
    this.#startFocusTimer(cycle);
  };

  #startLongbreakTimer = async () => {
    await this.#openAppAndWebpage("longbreak");
    await this.#printRemainingTime(this.settingsJson["longbreak"]);
    this.#startFocusTimer(0);
  };

  #printRemainingTime = async (targetMinutes) => {
    const targetSeconds = targetMinutes * 60;
    let elapsedSeconds = 0;

    while (elapsedSeconds < targetSeconds) {
      const oneMinutesLater = new Date().getTime() + 1000;

      readline.clearLine(process.stdout);
      const remainingMinutes = String(
        Math.floor((targetSeconds - elapsedSeconds) / 60)
      ).padStart(2, "0");
      const remainingSeconds = String(
        (targetSeconds - elapsedSeconds) % 60
      ).padStart(2, "0");
      process.stdout.write(`\r${remainingMinutes}:${remainingSeconds}`);

      while((oneMinutesLater - new Date().getTime()) > 0) {
        // do nothing
      }
      elapsedSeconds++;
    }
  };

  #openAppAndWebpage = async (timerType) => {
    if (timerType === "focus") process.stdout.write("\r\x1b[31mfocus");
    if (timerType === "break") process.stdout.write("\r\x1b[32mbreak");
    if (timerType === "longbreak") process.stdout.write("\r\x1b[32mlongbreak");

    open(`page/html/${timerType}.html`);
    await this.#sleep(3000);

    if (this.settingsJson[`${timerType}App`])
      await open.openApp(this.settingsJson[`${timerType}App`]);
    if (this.settingsJson[`${timerType}Url`])
      await open(this.settingsJson[`${timerType}Url`]);
    await this.#sleep(1000);
    open.openApp("Terminal");
  };

  #sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = PomodoroTimer;
