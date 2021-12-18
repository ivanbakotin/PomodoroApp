const progressBar = document.querySelector(".circle");
const progressButton = document.querySelector(".inside");
const time = document.querySelector(".time");
const statusText = document.querySelector(".status");
const short = document.querySelector(".short");
const long = document.querySelector(".long");
const settings = document.querySelector(".settings");
const reset = document.querySelector(".reset");
const options = document.querySelector(".options");
const closeSettings = document.querySelector(".close-settings");
const fillColorPicker = document.querySelector(".fill-color-picker");
const pomodoroTime = document.querySelector(".pomodoro-time");
const shortTime = document.querySelector(".short-time");
const longTime = document.querySelector(".long-time");

function convertTime(sec) {

    let hour = Math.floor(sec / 3600);

    let min = Math.floor((sec - (hour * 3600)) / 60);

    sec = Math.floor(sec - ((hour * 3600) + (min * 60)));

    (hour.toString().length === 1) ? hour = "0" + hour : null; 
    (min.toString().length === 1) ? min = "0" + min : null;    
    (sec.toString().length === 1) ? sec = "0" + sec : null;  

    return hour + ":" + min + ":" + sec;
}

class Timer {
    constructor() {
        this.intervalTime = 1000;
        this.progressValue = 0;
        this.pomodoroValue = 3600;
        this.timerID = null;
        this.paused = true;
        this.break = false;
        this.short = true;
        this.shortTime = 600;
        this.longTime = 1200;
        this.fillColor = "#e66140";
    }

    setPomodoroValue(time) {
        this.pomodoroValue = time;
    }

    setShortTime(time) {
        this.shortTime = time;
    }

    setLongTime(time) {
        this.longTime = time;
    }

    setFillColor(color) {
        this.fillColor = color;
        console.log(color);
    }

    setLong() {
        this.short = false;
        long.style.background = "#e66140";
        short.style.background = "";
    }

    setShort() {
        this.short = true;
        short.style.background = "#e66140";
        long.style.background = "";
    }

    startPomodoro() {
        if (this.paused) this.break ? this.runBreak() : this.runTimer()
        else this.pauseTimer(); 
    }

    pauseTimer() {
        clearInterval(this.timerID)
        this.paused = true;
        statusText.innerText = "paused";
    }

    resetTimer() {
        this.progressValue = 0;
        this.break = false;
        this.paused = true;
        statusText.innerText = "paused";
        progressBar.style.background = "";
        time.textContent = "00:00:00";
        clearInterval(this.timerID);
    }

    runTimer() {

        this.break = false;
        this.paused = false;

        statusText.innerText = "active";

        const scalingDeg = 360 / this.pomodoroValue;

        this.timerID = setInterval(() => {

            if (this.progressValue >= this.pomodoroValue) {
                this.resetTimer();
                this.runBreak()
                return;
            }
    
            this.progressValue++;
    
            time.textContent = convertTime(this.progressValue);
    
            progressBar.style.background = `conic-gradient(
                ${this.fillColor} ${this.progressValue * scalingDeg}deg,
                #cadcff ${this.progressValue * scalingDeg}deg
            )`;
    
        }, this.intervalTime)
    }

    runBreak() {

        this.break = true;
        this.paused = false;

        statusText.innerText = "active";

        const breakTimer = this.short ? this.shortTime : this.longTime;
        const scalingDeg = this.short ? 360 / this.shortTime : 360 / this.longTime;

        this.timerID = setInterval(() => {

            if (this.progressValue >= breakTimer) {
                this.resetTimer();
                this.runTimer();
                return;
            }
    
            this.progressValue++;
    
            time.textContent = convertTime(this.progressValue);
    
            progressBar.style.background = `conic-gradient(
                ${this.fillColor} ${this.progressValue * scalingDeg}deg,
                #cadcff ${this.progressValue * scalingDeg}deg
            )`;
    
        }, this.intervalTime)
    }
}

const timer = new Timer();

short.style.background = "#e66140";

progressButton.addEventListener("click", () => timer.startPomodoro());
short.addEventListener("click", () => timer.setShort());
long.addEventListener("click", () => timer.setLong());
reset.addEventListener("click", () => timer.resetTimer());
settings.addEventListener("click", () => options.style.visibility = "visible");
closeSettings.addEventListener("click", () => options.style.visibility = "hidden");
fillColorPicker.addEventListener("blur", e => timer.setFillColor(e.currentTarget.value));
pomodoroTime.addEventListener("blur", e => timer.setPomodoroValue(e.currentTarget.value));
shortTime.addEventListener("blur", e => timer.setShortTime(e.currentTarget.value));
longTime.addEventListener("blur", e => timer.setLongTime(e.currentTarget.value));
