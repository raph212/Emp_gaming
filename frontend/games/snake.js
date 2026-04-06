import { saveScore, showMessage } from '../js/utils.js';

const GRID_SIZE = 20, TILE_SIZE = 20;
let snake, food, score, direction, gameLoop, ctx;

const canvas = document.getElementById('snake-canvas');
ctx = canvas.getContext('2d');
canvas.width = GRID_SIZE * TILE_SIZE;
canvas.height = GRID_SIZE * TILE_SIZE;

function initializeSnakeGame(){
  snake = [{x:10,y:10}]; score = 0; direction = {x:0,y:0}; createFood(); document.addEventListener('keydown', handleKeyPress); document.getElementById('game-score').textContent = `Score: ${score}`; gameLoop = setInterval(gameTick, 150);
}
function cleanupSnakeGame(){ clearInterval(gameLoop); document.removeEventListener('keydown', handleKeyPress); }
function gameTick(){ updateSnakeGame(); drawSnakeGame(); }
function updateSnakeGame(){
  if(direction.x === 0 && direction.y === 0) return;
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) { endGame(score); return; }
  if (snake.some(segment => segment.x === head.x && segment.y === head.y)) { endGame(score); return; }
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) { score++; document.getElementById('game-score').textContent = `Score: ${score}`; createFood(); } else snake.pop();
}
function drawSnakeGame(){
  ctx.fillStyle = '#1a202c'; ctx.fillRect(0,0,GRID_SIZE*TILE_SIZE,GRID_SIZE*TILE_SIZE);
  ctx.fillStyle = '#10b981'; snake.forEach((segment,index)=>{ ctx.fillStyle = (index===0) ? '#059669' : '#10b981'; ctx.fillRect(segment.x * TILE_SIZE, segment.y * TILE_SIZE, TILE_SIZE, TILE_SIZE); });
  ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(food.x * TILE_SIZE + TILE_SIZE/2, food.y * TILE_SIZE + TILE_SIZE/2, TILE_SIZE/2, 0, 2*Math.PI); ctx.fill();
}
function createFood(){ do{ food = { x: Math.floor(Math.random()*GRID_SIZE), y: Math.floor(Math.random()*GRID_SIZE) }; } while (snake.some(s => s.x === food.x && s.y === food.y)); }
function handleKeyPress(e){
  switch(e.key){ case 'ArrowUp': e.preventDefault(); if(direction.y===0) direction={x:0,y:-1}; break; case 'ArrowDown': e.preventDefault(); if(direction.y===0) direction={x:0,y:1}; break; case 'ArrowLeft': e.preventDefault(); if(direction.x===0) direction={x:-1,y:0}; break; case 'ArrowRight': e.preventDefault(); if(direction.x===0) direction={x:1,y:0}; break; }
}
function endGame(finalScore){
  cleanupSnakeGame();
  showMessage(`Game Over! Final Score: ${finalScore}`);
  // save score to backend
  saveScoreToBackend(finalScore);
}
async function saveScoreToBackend(finalScore){
  await saveScore('snake', finalScore);
  // redirect back to dashboard after a short delay
  setTimeout(()=> window.location.href = '../dashboard.html', 800);
}

document.getElementById('start-btn').addEventListener('click', ()=>{ initializeSnakeGame(); });
