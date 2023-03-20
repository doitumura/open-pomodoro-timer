const readline = require("readline");
const open = require("open");

//カウントダウン中にctrl+cが押された場合にカーソルを再表示する
process.on("exit", () => process.stdout.write("\x1b[?25h"));
process.on("SIGINT", () => process.exit(0));

class PomodoroTimer {
  constructor(settingsJson) {
    this.settingsJson = settingsJson;

    if (process.env.TERM_PROGRAM) {
      if (process.env.TERM_PROGRAM === "Apple_Terminal")
        this.terminalProgram = "Terminal";
      else this.terminalProgram = process.env.TERM_PROGRAM;
    } else {
      this.terminalProgram = "";
    }
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

    if (this.terminalProgram) await open.openApp(this.terminalProgram);
    const answer = await this.#askToStartTimer("Focus", nextTimerType);
    if (!answer) return;

    if (nextTimerType === "break") this.#startBreakTimer(cycle);
    else if (nextTimerType === "longbreak") this.#startLongbreakTimer();
  };

  #startBreakTimer = async (cycle) => {
    await this.#openAppAndWebpage("break");
    await this.#printRemainingTime(this.settingsJson["break"], "break");
    if (this.terminalProgram) await open.openApp(this.terminalProgram);
    const answer = await this.#askToStartTimer("Break", "focus");
    if (!answer) return;
    this.#startFocusTimer(cycle);
  };

  #startLongbreakTimer = async () => {
    await this.#openAppAndWebpage("longbreak");
    await this.#printRemainingTime(this.settingsJson["longbreak"], "break");
    if (this.terminalProgram) await open.openApp(this.terminalProgram);
    const answer = await this.#askToStartTimer("Longbreak", "focus");
    if (!answer) return;
    this.#startFocusTimer(0);
  };

  #printRemainingTime = async (targetMinutes, timerType) => {
    //カウントダウンしている間はカーソルが邪魔なので非表示にする
    process.stdout.write("\x1b[?25l");

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
      if (timerType === "focus")
        process.stdout.write(
          `\r\x1b[31m${remainingMinutes}:${remainingSeconds}`
        );
      else if (timerType === "break")
        process.stdout.write(
          `\r\x1b[32m${remainingMinutes}:${remainingSeconds}`
        );

      while (oneMinutesLater - new Date().getTime() > 0) {
        await new Promise((resolve) => setTimeout(resolve, 10));
      }
      elapsedSeconds++;
    }

    //カーソルの表示を元に戻す
    process.stdout.write("\x1b[?25h");
  };

  #openAppAndWebpage = async (timerType) => {
    if (this.settingsJson[`${timerType}App`])
      await open.openApp(this.settingsJson[`${timerType}App`]);
    if (this.settingsJson[`${timerType}Url`])
      await open(this.settingsJson[`${timerType}Url`]);
  };

  #askToStartTimer = async (expiredTimerType, nextTimerType) => {
    const answer = await new Promise((resolve) => {
      const CtrlC = "\u0003";
      const stdin = process.stdin;
      const callBack = (key) => {
        if (key === CtrlC) process.exit();
        process.stdout.write(key);
        stdin.off("data", callBack);
        stdin.pause();
        stdin.setRawMode(stdin.isRaw);
        resolve(key);
      };
      stdin.setEncoding("utf8");
      stdin.setRawMode(true);
      stdin.resume();
      stdin.write(
        `\r\x1b[0m${expiredTimerType} timer expired. Start ${nextTimerType} timer? (y/n):`
      );
      stdin.on("data", callBack);
    });

    //process.stdinの初期化方法がわからなかったのでreaderで強引にclose
    //これをやらないと次のタイマーでctrl+cが動作しなくなる
    const reader = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    reader.close();

    if (answer === "y") return true;
    else return false;
  };
}

module.exports = PomodoroTimer;
