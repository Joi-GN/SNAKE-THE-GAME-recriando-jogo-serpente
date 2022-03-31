// Variables
const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const block = 32;

let snake = [];
snake[0] = {
    x: 7 * block,
    y: 8 * block
}

let direction = "right";

let food = {
    x: Math.floor(Math.random()*15+1)*block,
    y: Math.floor(Math.random()*15+1)*block,
}

let foodEaten = 0;

// Start Game
let game = setInterval(startGame, 100);

// Capturing pressed arrow keys
document.addEventListener('keydown', (event)=>{
    if(event.code === 'ArrowLeft' && direction != "right"){
        direction = 'left'; 
        console.log("seta esquerda");
    }else if(event.code === 'ArrowRight' && direction != "left"){
        direction = 'right'; console.log("seta direita"); 
    }else if(event.code === 'ArrowUp' && direction != "down") {
        direction = 'up'; console.log("seta pra cima");   
    }else if(event.code === 'ArrowDown' && direction != "up"){
        direction = 'down'; console.log("seta pra baixo");
    }  
});

function startGame(){
    createBackground();
    createSnake();
    generateFood();

    // Snake's position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Snake's Movement
    if(direction == "right") snakeX += block;
    if(direction == "left") snakeX -= block;
    if(direction == "up") snakeY -= block;
    if(direction == "down") snakeY += block;

    let head = {
        x: snakeX,
        y: snakeY
    }

    // Eats food == tail grows
    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }else{
        foodEaten++;
        food.x = Math.floor(Math.random()*15+1)*block;
        food.y = Math.floor(Math.random()*15+1)*block;
    }
    
    snake.unshift(head);

    // Scoreboard
    document.getElementById('score').innerHTML = `Pontuação: ${foodEaten}`;

    // Loop - Screen border
    if(snake[0].x > 15 * block && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * block;
    if(snake[0].y > 15 * block && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * block;

    //Game Over - Snake runs into itself
    for(let i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(game);
            alert('Game Over');
        }
    }
}

function createBackground(){
    context.fillStyle = "#c6ff70";
    context.fillRect(0, 0, 16*block, 16*block);
}

function createSnake(){
    for(let i = 0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, block, block);
    }
}

function generateFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, block, block);
}
