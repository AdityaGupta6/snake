//game constant and variable
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let speed = 1.2;
let lastPaintTime = 0;
let snakeArr = [
    { x: 1, y: 1 }
]
let food = { x: 12, y: 15 }
let score = 0

//game functions
function main(ctime) {
    window.requestAnimationFrame(main);


    if ((ctime - lastPaintTime) / 1000 < 0.1 / speed) {
        console.log("Hi")
        return;
    }


    lastPaintTime = ctime;
    gameEngine()
}
function isCollide(snake) {
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }


}
function gameEngine() {

    //render the snake or food
    // updating the snake variable
    musicSound.play()
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        moveSound.pause();
        inputDir = { x: 0, y: 0 }
        musicSound.pause()
        alert("Game Over Press OK to play again");
        score = 0;
        snakeArr = [{ x: 1, y: 1 }]
        musicSound.play()

    }

    // if you have eaten the food increament the score and regenerated the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        score += 1;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
        if (score > highScoreVal) {
            score = highScoreVal;
            localStorage.setItem("highscore", JSON.stringify(highScoreVal))
            highScoreBox.innerText = "HighScore" + ":" + highScoreVal

        }
        foodSound.play()
        scoreBox.innerText = "Score" + ":" + score
    }

    // //Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;






    // display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y
        snakeElement.style.gridColumnStart = e.x
        if (index == 0) {
            snakeElement.classList.add("head");

        }
        else {
            snakeElement.classList.add("snake")
        }
        board.appendChild(snakeElement)
    })
    // display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food")
    board.appendChild(foodElement)

}
//Main logic starts here
let highScore = localStorage.getItem('highscore');
if (highScore === null) {
    let highScoreVal = 0;
    localStorage.setItem("highscore", JSON.stringify(highScoreVal))
}
else {
    highScoreVal = JSON.parse(highScore)
    highScoreBox.innerText = "HighScore" + ":" + highScore
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', (e) => {
    inputDir = { x: 0, y: 1 };//start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("Arrow up")
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("Arrow down")
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowRight":
            console.log("Arrow right")
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        case "ArrowLeft":
            console.log("Arrow left")
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
})