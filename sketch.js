let board;
let currentPlayer;
let cellSize;
let winningLine = null;
let restartButton;

function setup() {
  createCanvas(600, 600);
  cellSize = width / 3;
  createRestartButton();
  resetGame();
}

function draw() {
  drawBackground();
  drawBoard();
  let result = checkWinner();
  if (result) {
    drawWinningLine();
    displayWinner(result);
    noLoop();
  }
}

function createRestartButton() {
  restartButton = createButton('Restart');
  restartButton.position(width / 2 - 50, height + 20);
  restartButton.mousePressed(resetGame);
  restartButton.style('font-size', '20px');
  restartButton.style('color', '#FFFFFF');
  restartButton.style('background-color', '#000000');
  restartButton.style('border', 'none');
  restartButton.style('padding', '10px 20px');
  restartButton.style('text-shadow', '0 0 10px #00FFFF, 0 0 20px #00FFFF, 0 0 30px #00FFFF');
  restartButton.style('box-shadow', '0 0 20px #00FFFF, 0 0 30px #00FFFF, 0 0 40px #00FFFF');
  restartButton.style('border-radius', '5px');
}

function resetGame() {
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  currentPlayer = 'X';
  winningLine = null;
  loop();
}

function mousePressed() {
  if (winningLine) return; // Prevent further moves after the game ends
  let i = floor(mouseX / cellSize);
  let j = floor(mouseY / cellSize);
  if (i >= 0 && i < 3 && j >= 0 && j < 3) {
    if (board[j][i] == '') {
      board[j][i] = currentPlayer;
      currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
    }
  }
}

function drawBackground() {
  // Neon gradient background
  for (let i = 0; i < height; i++) {
    let inter = map(i, 0, height, 0, 1);
    let c = lerpColor(color(255, 0, 255), color(0, 255, 255), inter);
    stroke(c);
    line(0, i, width, i);
  }
}

function drawBoard() {
  strokeWeight(10);
  stroke(255, 255, 255);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let x = i * cellSize;
      let y = j * cellSize;
      line(x + cellSize, 0, x + cellSize, height);
      line(0, y + cellSize, width, y + cellSize);
      let spot = board[j][i];
      textSize(32);
      let r = cellSize / 2;
      if (spot == 'X') {
        stroke(0, 255, 255); // Bright cyan
        line(x + r / 2, y + r / 2, x + r * 1.5, y + r * 1.5);
        line(x + r * 1.5, y + r / 2, x + r / 2, y + r * 1.5);
      } else if (spot == 'O') {
        noFill();
        stroke(255, 0, 255); // Bright magenta
        ellipse(x + r, y + r, r * 1.5);
      }
    }
  }
}

function checkWinner() {
  let winner = null;

  // Horizontal, Vertical & Diagonal Check
  for (let i = 0; i < 3; i++) {
    if (board[i][0] == board[i][1] && board[i][1] == board[i][2] && board[i][0] != '') {
      winner = board[i][0];
      winningLine = {type: 'row', index: i};
    }
    if (board[0][i] == board[1][i] && board[1][i] == board[2][i] && board[0][i] != '') {
      winner = board[0][i];
      winningLine = {type: 'col', index: i};
    }
  }
  if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != '') {
    winner = board[0][0];
    winningLine = {type: 'diag', index: 0};
  }
  if (board[2][0] == board[1][1] && board[1][1] == board[0][2] && board[2][0] != '') {
    winner = board[2][0];
    winningLine = {type: 'diag', index: 1};
  }

  // Check for Tie
  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == '') {
        openSpots++;
      }
    }
  }

  if (winner == null && openSpots == 0) {
    return 'tie';
  } else {
    return winner;
  }
}

function drawWinningLine() {
  if (!winningLine) return;

  stroke(255, 255, 0);
  strokeWeight(4);
  let x1, y1, x2, y2;
  if (winningLine.type == 'row') {
    x1 = 20;
    y1 = winningLine.index * cellSize + cellSize / 2;
    x2 = width-20;
    y2 = y1;
  } else if (winningLine.type == 'col') {
    x1 = winningLine.index * cellSize + cellSize / 2;
    y1 = 20;
    x2 = x1;
    y2 = height-20;
  } else if (winningLine.type == 'diag') {
    if (winningLine.index == 0) {
      x1 = 20;
      y1 = 20;
      x2 = width-20;
      y2 = height-20;
    } else {
      x1 = 20;
      y1 = height-20;
      x2 = width-20;
      y2 = 20;
    }
  }
  line(x1, y1, x2, y2);
}

function displayWinner(winner) {
  textSize(100);
  textAlign(CENTER, CENTER);
  fill(0);
  stroke(255);
  if (winner == 'tie') {
    text("Tie!", width / 2, height / 2);
  } else {
    text(winner + " Wins!", width / 2, height / 2);
  }
}
