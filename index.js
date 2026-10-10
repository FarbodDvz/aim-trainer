const timerDisplay = document.getElementById(`timer`);
const target = document.getElementById(`target`);
const screen = document.getElementById(`game-screen`);
const killCountDisplay = document.getElementById(`kill-count`);

let elapsedTime = 0;
let startTime = 0;
let timer = null;

target.style.left = `50%`;
target.style.top = `50%`;
target.addEventListener("click", gameStart);


function gameStart(event) {
    const gameTimer = setTimeout(gameEnd, 30000);
    let killCount = 0;
    let leftPos = 0;
    let topPos = 0;
    
    
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateTimerDisplay, 10);

    target.removeEventListener("click", gameStart);

    target.addEventListener(`click`, (event) => {
        killCount++;
        killCountDisplay.textContent = `Kill Count: ${killCount}`;

        leftPos = Math.floor(Math.random() * 99);
        topPos = Math.floor(Math.random() * 99);

        target.style.left = `${leftPos}%`;
        target.style.top = `${topPos}%`;
    })
}


function gameEnd(){
    target.style.left = `50%`;
    target.style.top = `50%`;
    timerDisplay.textContent = `Game Ended! Click the target to start aim training again`;

    target.removeEventListener("click", gameStart);
    target.addEventListener("click", gameStart);

    startTime = 0;
    elapsedTime = 0;
    clearInterval(timer);
}


function updateTimerDisplay() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    let seconds = Math.floor(elapsedTime / 1000 % 60);
    seconds = seconds.toString().padStart(2,0);
    let miliseconds = Math.floor(elapsedTime % 1000 / 10);
    miliseconds = miliseconds.toString().padStart(2,0);

    timerDisplay.textContent = `${seconds}:${miliseconds}`;
}