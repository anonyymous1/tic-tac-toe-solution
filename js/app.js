// Grab elements
const status = document.querySelector('.status');
const reset = document.querySelector('.reset');
const boxes = document.querySelectorAll('.box');

console.log(reset);
console.log(boxes);

// Game constants
let X = "🅧";
let O = "🅞";

// Game variables
let gameIsLive = true;
let xIsNext = true;

// functions
const letterToSymbol = function (letter) {
    if (letter === '🅧') {
        return X;
    } else {
        return O;
    }
}

const handleWin = (letter) => {
    gameIsLive = false;
    if (letter === "🅧") {
      status.textContent = `🅧 has won!`;
      console.log(`${status}`, 1);
    } else {
        status.textContent = `🅞 has won!`;
        console.log(`${status}`, 2);
    }
};

const checkGameStatus = () => {
    const topLeft = boxes[0].classList[1];
    const topMiddle = boxes[1].classList[1];
    const topRight = boxes[2].classList[1];

    const middleLeft = boxes[3].classList[1];
    const middleMiddle = boxes[4].classList[1];
    const middleRight = boxes[5].classList[1];
    
    const bottomLeft = boxes[6].classList[1];
    const bottomMiddle = boxes[7].classList[1];
    const bottomRight = boxes[8].classList[1];
  
    // check winner
    if (topLeft && topLeft === topMiddle && topLeft === topRight) {
      handleWin(topLeft);
      boxes[0].classList.add("won");
      boxes[1].classList.add("won");
      boxes[2].classList.add("won");
    } else if (
      middleLeft &&
      middleLeft === middleMiddle &&
      middleLeft === middleRight
    ) {
      handleWin(middleLeft);
      boxes[3].classList.add("won");
      boxes[4].classList.add("won");
      boxes[5].classList.add("won");
    } else if (
      bottomLeft &&
      bottomLeft === bottomMiddle &&
      bottomLeft === bottomRight
    ) {
      handleWin(bottomLeft);
      boxes[6].classList.add("won");
      boxes[7].classList.add("won");
      boxes[8].classList.add("won");
    } else if (topLeft && topLeft === middleLeft && topLeft === bottomLeft) {
      handleWin(topLeft);
      boxes[0].classList.add("won");
      boxes[3].classList.add("won");
      boxes[6].classList.add("won");
    } else if (
      topMiddle &&
      topMiddle === middleMiddle &&
      topMiddle === bottomMiddle
    ) {
      handleWin(topMiddle);
      boxes[1].classList.add("won");
      boxes[4].classList.add("won");
      boxes[7].classList.add("won");
    } else if (topRight && topRight === middleRight && topRight === bottomRight) {
      handleWin(topRight);
      boxes[2].classList.add("won");
      boxes[5].classList.add("won");
      boxes[8].classList.add("won");
    } else if (topLeft && topLeft === middleMiddle && topLeft === bottomRight) {
      handleWin(topLeft);
      boxes[0].classList.add("won");
      boxes[4].classList.add("won");
      boxes[8].classList.add("won");
    } else if (topRight && topRight === middleMiddle && topRight === bottomLeft) {
      handleWin(topRight);
      boxes[2].classList.add("won");
      boxes[4].classList.add("won");
      boxes[6].classList.add("won");
    } else if (
      topLeft &&
      topMiddle &&
      topRight &&
      middleLeft &&
      middleMiddle &&
      middleRight &&
      bottomLeft &&
      bottomMiddle &&
      bottomRight
    ) {
      gameIsLive = false;
      status.textContent = "Game is tied!";
      console.log(`${status}`, 3);
    } else {
      xIsNext = !xIsNext;
      if (xIsNext) {
        status.textContent = `${X} is next`;
        console.log(`${status}`, 4);
      } else {
        status.textContent = `${O} is next`;
        console.log(`${status}`, 5);
      }
    }
    console.log('Check game status!');
  };

// event handlers
function handleReset() {
    xIsNext = true;
    status.textContent = `${X} is next`;
    console.log(`${status}`, 6);
    // status.innerHTML = `<p>${X} is next</p>`; 

    for (let eachBox of boxes) {
        eachBox.classList.remove('x');
        eachBox.classList.remove('o');
        eachBox.classList.remove('won');
    }
    gameIsLive = true;
}

function handleBoxClick(e) {
    let classList = e.target.classList;

    if (!gameIsLive || classList[1] === 'x' || classList[1] === 'o') {
        return;
    }

    if (xIsNext) {
        classList.add('x');
        checkGameStatus();
    } else {
        classList.add('o');
        checkGameStatus();
    }

    console.log(classList);
}

// event listener
reset.addEventListener('click', handleReset);

for (let eachBox of boxes) {
    eachBox.addEventListener('click', handleBoxClick);
}
