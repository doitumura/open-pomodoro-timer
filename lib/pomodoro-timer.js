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
    await this.#printRemainingTime(this.settingsJson["focus"], "focus");

    cycle++;
    let nextTimerType;
    if (
      this.settingsJson["cycle"] === 0 ||
      cycle !== this.settingsJson["cycle"]
    ) {
      nextTimerType = "break";
    } else {
      nextTimerType = "longbreak";
    }

    const answer = await this.#askToStartTimer("Focus", nextTimerType);
    if (!answer) return;

    if (nextTimerType === "break") this.#startBreakTimer(cycle);
    else if (nextTimerType === "longbreak") this.#startLongbreakTimer();
  };

  #startBreakTimer = async (cycle) => {
    await this.#openAppAndWebpage("break");
    await this.#printRemainingTime(this.settingsJson["break"], "break");

    const answer = await this.#askToStartTimer("Break", "focus");
    if (!answer) return;
    this.#startFocusTimer(cycle);
  };

  #startLongbreakTimer = async () => {
    await this.#openAppAndWebpage("longbreak");
    await this.#printRemainingTime(this.settingsJson["longbreak"], "break");

    const answer = await this.#askToStartTimer("Longbreak", "focus");
    if (!answer) return;
    this.#startFocusTimer(0);
  };

  #printRemainingTime = async (targetMinutes, timerType) => {
    const targetSeconds = targetMinutes * 60;
    let elapsedSeconds = 0;

    //reader.questionを呼んだときに改行が入り画面がガクッと見えるので先に改行しておく
    console.log();
    readline.moveCursor(process.stdout, 0, -1);

    while (elapsedSeconds < targetSeconds) {
      const oneMinutesLater = new Date().getTime() + 1000;

      readline.clearLine(process.stdout);
      const remainingMinutes = String(
        Math.floor((targetSeconds - elapsedSeconds) / 60)
      ).padStart(2, "0");
      const remainingSeconds = String(
        (targetSeconds - elapsedSeconds) % 60
      ).padStart(2, "0");
      if (timerType === "focus")
        process.stdout.write(
          `\r\x1b[31m${remainingMinutes}:${remainingSeconds}`
        );
      else if (timerType === "break")
        process.stdout.write(
          `\r\x1b[32m${remainingMinutes}:${remainingSeconds}`
        );

      while (oneMinutesLater - new Date().getTime() > 0) {
        await new Promise(resolve => setTimeout(resolve, 10))
      }
      elapsedSeconds++;
    }
  };

  #openAppAndWebpage = async (timerType) => {
    if (this.settingsJson[`${timerType}App`])
      await open.openApp(this.settingsJson[`${timerType}App`]);
    if (this.settingsJson[`${timerType}Url`])
      await open(this.settingsJson[`${timerType}Url`]);
    open.openApp("Terminal");
  };

  #askToStartTimer = async (expiredTimerType, nextTimerType) => {
    const reader = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    process.stdout.write(
      `\r\x1b[30m${expiredTimerType} timer expired. Start ${nextTimerType} timer? (y/n):`
    );
    const answer = await new Promise((resolve) => {
      reader.question(
        `\r\x1b[30m${expiredTimerType} timer expired. Start ${nextTimerType} timer? (y/n):`,
        resolve
      );
    });
    readline.moveCursor(process.stdout, 0, -1);
    readline.clearLine(process.stdout);
    reader.close();

    if (answer === "y") return true;
    else return false;
  };
}

module.exports = PomodoroTimer;
