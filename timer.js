//Timer class set that ticks a clock
//Timer set to tick every 1/100th seconds
//Callbacks can be passed to the function for event notifications of
// onStart, onTick, and onComplete.
//The startButton is disabled when the clock is running.

class Timer {
    constructor(durationInput, startButton, pauseButton, callbacks) {
        this.durationInput = durationInput;
        this.startBtn = startButton;
        this.pauseBtn = pauseButton;

        //check if callbacks were provided
        if (callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;

        }

        //Listen of pressing of start and pause buttons
        this.startBtn.addEventListener('click', this.start);
        this.pauseBtn.addEventListener('click', this.pause);

    };

    start = () => {
        //callback clock has started
        if (this.onStart) {
            this.onStart(this.timeRemaining);
        }

        //Tick the clock every 1/100 second
        this.startBtn.setAttribute("disabled", true);  //disable startBtn
        this.tick();
        this.intervalID = setInterval(this.tick, 10);
    };

    pause = () => {
        //stop the timer

        clearInterval(this.intervalID);
        this.startBtn.removeAttribute("disabled");  //enable startBtn
    };

    tick = () => {

        //stops the clock if time has reached 0
        if (this.timeRemaining <= 0) {
            this.pause();

            //callback that clock has finished
            if (this.onComplete) {
                this.onComplete();
            }
        } else {
            //.01 is for 1/100 second updates
            this.timeRemaining = this.timeRemaining - .01;

            //callback that clock ticked
            if (this.onTick) {
                this.onTick(this.timeRemaining);
            }
        }

    };

    get timeRemaining() {
        //grabs the input value from the DOM and puts returns a float
        return parseFloat(this.durationInput.value);
    }

    set timeRemaining(newTime) {
        //sets the new value in the DOM
        this.durationInput.value = newTime.toFixed(2);
    }
}