import { saveScore, showMessage } from '../js/utils.js';

let board, twenty48Score, BOARD_SIZE = 4;

function initialize2048(){
  board = Array.from({length: BOARD_SIZE}, ()=>Array(BOARD_SIZE).fill(0));
  twenty48Score = 0; spawnNewTile(); spawnNewTile(); updateBoardUI();
  document.addEventListener('keydown', handleKey);
  document.getElementById('game-score').textContent = `Score: ${twenty48Score}`;
}
function cleanup2048(){ document.removeEventListener('keydown', handleKey); }
function updateBoardUI(){
  const boardEl = document.getElementById('board-2048'); if(!boardEl) return; boardEl.innerHTML='';
  for(let r=0;r<BOARD_SIZE;r++){ for(let c=0;c<BOARD_SIZE;c++){ const tileValue = board[r][c]; const tile = document.createElement('div'); const colorClass = tileValue>0 ? `tile-${tileValue}` : ''; tile.className = `tile ${colorClass}`; tile.textContent = tileValue>0 ? tileValue : ''; boardEl.appendChild(tile); } }
  document.getElementById('game-score').textContent = `Score: ${twenty48Score}`;
}
function spawnNewTile(){ const empty=[]; for(let r=0;r<BOARD_SIZE;r++) for(let c=0;c<BOARD_SIZE;c++) if(board[r][c]===0) empty.push({r,c}); if(empty.length>0){ const t = empty[Math.floor(Math.random()*empty.length)]; board[t.r][t.c] = Math.random() < 0.9 ? 2 : 4; } }
function slide(row){ const newRow = row.filter(val=>val!==0); const zeros = Array(BOARD_SIZE - newRow.length).fill(0); return newRow.concat(zeros); }
function combine(row){ let combined=false; for(let i=0;i<BOARD_SIZE-1;i++){ if(row[i]!==0 && row[i]===row[i+1]){ row[i]*=2; twenty48Score += row[i]; row[i+1]=0; combined=true; } } return combined; }
function move(dir){
  let moved=false; const newBoard = Array.from({ length: BOARD_SIZE }, (_, r) => [...board[r]]);
  if(dir === 'left' || dir === 'right'){
    for(let r=0;r<BOARD_SIZE;r++){
      let row = [...newBoard[r]];
      if(dir === 'right') row.reverse();
      row = slide(row);
      moved = combine(row) || moved;
      row = slide(row);
      if(dir === 'right') row.reverse();
      for(let c=0;c<BOARD_SIZE;c++){ if(row[c] !== board[r][c]) moved = true; }
      newBoard[r] = row;
    }
  } else {
    for(let c=0;c<BOARD_SIZE;c++){
      let col=[]; for(let r=0;r<BOARD_SIZE;r++) col.push(newBoard[r][c]);
      if(dir==='down') col.reverse();
      col = slide(col);
      moved = combine(col) || moved;
      col = slide(col);
      if(dir === 'down') col.reverse();
      for(let r=0;r<BOARD_SIZE;r++){ if(col[r] !== board[r][c]) moved = true; newBoard[r][c] = col[r]; }
    }
  }
  if(moved){ board = newBoard; spawnNewTile(); updateBoardUI(); if(!hasMovesLeft()) endGame(); }
}
function hasMovesLeft(){ for(let r=0;r<BOARD_SIZE;r++) for(let c=0;c<BOARD_SIZE;c++) if(board[r][c]===0) return true; for(let r=0;r<BOARD_SIZE;r++) for(let c=0;c<BOARD_SIZE;c++){ const cur = board[r][c]; if(c < BOARD_SIZE-1 && board[r][c+1] === cur) return true; if(r < BOARD_SIZE-1 && board[r+1][c] === cur) return true; } return false; }
function handleKey(e){ switch(e.key){ case 'ArrowUp': e.preventDefault(); move('up'); break; case 'ArrowDown': e.preventDefault(); move('down'); break; case 'ArrowLeft': e.preventDefault(); move('left'); break; case 'ArrowRight': e.preventDefault(); move('right'); break; } }
function endGame(){
  cleanup2048();
  showMessage(`Game Over! Final Score: ${twenty48Score}`);
  saveScore('2048', twenty48Score).then(()=> setTimeout(()=> window.location.href='../dashboard.html',800));
}

window.addEventListener('load', ()=> initialize2048());
