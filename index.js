//Runs the Timer class and adds a countdown circle around the clock.


const durationInput = document.getElementById("duration");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const circle = document.querySelector("circle");

const perimeter = circle.getAttribute("r") * Math.PI * 2;
circle.setAttribute("stroke-dasharray", perimeter);

let offset = 0;
let duration = 0;
const timer = new Timer(durationInput, startBtn, pauseBtn,
    {
        onStart(totalDuration) {
            //Resets the countdown circle to draw from the top.
            //Does nothing if timer is paused and started with no changes

            if (!offset || offset === (perimeter * -1)) {
                //if timer has not run before or previous timer is finished
                duration = totalDuration;
                offset = 0;
            } else if (duration < totalDuration) {
                //new longer time than the previous start time is entered before timer completed.
                duration = totalDuration;
                offset = 0;
            }

        },
        onTick(timeRemaining) {

            offset = perimeter * (1 - timeRemaining / duration) * -1;
            circle.setAttribute("stroke-dashoffset", offset);

            // stroke-dasharray = "1193"
            // stroke-dashoffset= "-500"
        },
        onComplete() {
            console.log("clock finished");
            offset = -1 * perimeter;
            circle.setAttribute("stroke-dashoffset", offset);
        }
    });


