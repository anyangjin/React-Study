document.addEventListener("DOMContentLoaded", function () {
  const boardSize = 20; // Size of the game board in cells
  const cellSize = 20; // Size of each cell in pixels

  const gameBoard = document.getElementById("game-board");
  const cells = [];

  let snake = [{ x: 10, y: 10 }]; // Initial position of the snake
  let direction = "right"; // Initial direction of the snake
  let food = { x: 15, y: 10 }; // Initial position of the food

  // Create the game board cells
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.style.top = row * cellSize + "px";
      cell.style.left = col * cellSize + "px";
      gameBoard.appendChild(cell);
      cells.push(cell);
    }
  }

  // Update the game board based on the snake's position and the food
  function updateBoard() {
    // Clear the board
    cells.forEach((cell) => {
      cell.classList.remove("snake", "food");
    });

    // Draw the snake
    snake.forEach((segment) => {
      const index = segment.y * boardSize + segment.x;
      cells[index].classList.add("snake");
    });

    // Draw the food
    const foodIndex = food.y * boardSize + food.x;
    cells[foodIndex].classList.add("food");
  }

  // Move the snake based on the current direction
  function moveSnake() {
    const head = { ...snake[0] };

    switch (direction) {
      case "up":
        head.y--;
        break;
      case "down":
        head.y++;
        break;
      case "left":
        head.x--;
        break;
      case "right":
        head.x++;
        break;
    }

    snake.unshift(head); // Add the new head to the snake

    // Check if the snake has eaten the food
    if (head.x === food.x && head.y === food.y) {
      // Generate a new position for the food
      generateFood();
    } else {
      snake.pop(); // Remove the tail segment
    }

    updateBoard();

    // Check for collision with walls or self
    if (
      head.x < 0 ||
      head.x >= boardSize ||
      head.y < 0 ||
      head.y >= boardSize ||
      checkCollision(head)
    ) {
      alert("Game Over");
      resetGame();
      return;
    }
  }

  // Check for collision with snake's body
  function checkCollision(position) {
    return snake.some(
      (segment) => segment.x === position.x && segment.y === position.y
    );
  }

  // Generate a new random position for the food
  function generateFood() {
    while (true) {
      const randomX = Math.floor(Math.random() * boardSize);
      const randomY = Math.floor(Math.random() * boardSize);
      const isOnSnake = snake.some(
        (segment) => segment.x === randomX && segment.y === randomY
      );

      if (!isOnSnake) {
        food = { x: randomX, y: randomY };
        return;
      }
    }
  }

  // Reset the game
  function resetGame() {
    snake = [{ x: 10, y: 10 }];
    direction = "right";
    generateFood();
    updateBoard();
  }

  // Handle keyboard arrow keys to change the snake's direction
  document.addEventListener("keydown", function (event) {
    const key = event.key.toLowerCase();

    switch (key) {
      case "arrowup":
        if (direction !== "down") {
          direction = "up";
        }
        break;
      case "arrowdown":
        if (direction !== "up") {
          direction = "down";
        }
        break;
      case "arrowleft":
        if (direction !== "right") {
          direction = "left";
        }
        break;
      case "arrowright":
        if (direction !== "left") {
          direction = "right";
        }
        break;
    }
  });

  // Start the game loop
  let gameLoop = setInterval(moveSnake, 200);

  // Adjust snake's movement speed by changing the interval time
  function setGameSpeed(speed) {
    clearInterval(gameLoop);
    gameLoop = setInterval(moveSnake, speed);
  }

  // Call the setGameSpeed function with your desired interval time (in milliseconds)
  setGameSpeed(300);
});
