const progressBar = document.querySelector(".circle");
const progressButton = document.querySelector(".inside");
const time = document.querySelector(".time");
const statusText = document.querySelector(".status");
const short = document.querySelector(".short")
const long = document.querySelector(".long")

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
    constructor(time = 3600) {
        this.intervalTime = 1;
        this.progressValue = 0;
        this.progressEndValue = time;
        this.scalingDeg = 360 / time;
        this.timerID = null;
        this.paused = true;
        this.break = false;
        this.short = true;
        this.shortTime = 600;
        this.longTime = 1200;
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
        this.clearTimer();
        this.paused = true;
        statusText.innerText = "paused";
    }

    clearTimer() {
        clearInterval(this.timerID)
    }

    resetTimer() {
        this.progressValue = 0;
    }

    runTimer() {

        this.break = false;
        this.paused = false;

        statusText.innerText = "active";

        this.timerID = setInterval(() => {

            if (this.progressValue >= this.progressEndValue) {
                this.resetTimer();
                this.clearTimer()
                this.runBreak()
                return;
            }
    
            this.progressValue++;
    
            time.textContent = convertTime(this.progressValue);
    
            progressBar.style.background = `conic-gradient(
                #e66140 ${this.progressValue * this.scalingDeg}deg,
                #cadcff ${this.progressValue * this.scalingDeg}deg
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
                this.clearTimer();
                this.runTimer();
                return;
            }
    
            this.progressValue++;
    
            time.textContent = convertTime(this.progressValue);
    
            progressBar.style.background = `conic-gradient(
                #e66140 ${this.progressValue * scalingDeg}deg,
                #cadcff ${this.progressValue * scalingDeg}deg
            )`;
    
        }, this.intervalTime)
    }
}

const newTimer = new Timer();

short.style.background = "#e66140";

progressButton.addEventListener("click", () => newTimer.startPomodoro())
short.addEventListener("click", () => newTimer.setShort())
long.addEventListener("click", () => newTimer.setLong())
