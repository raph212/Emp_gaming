import { saveScore, showMessage } from '../js/utils.js';

let cardSymbols = ['🎮','🚀','💡','🏆','🎉','🌟','🎯','⚡'];
let cards = [], flippedCards = [], matchedPairs = 0, moves = 0;

function initializeMemory(){
  cards = [...cardSymbols, ...cardSymbols].sort(()=>0.5 - Math.random());
  flippedCards = []; matchedPairs = 0; moves = 0;
  const grid = document.getElementById('card-grid'); grid.innerHTML = '';
  cards.forEach((symbol, index) => {
    const card = document.createElement('div');
    card.className = 'memory-card';
    card.dataset.symbol = symbol;
    card.dataset.index = index;
    card.innerHTML = `<div class="card-face card-back">?</div><div class="card-face card-front">${symbol}</div>`;
    card.addEventListener('click', handleCardClick);
    grid.appendChild(card);
  });
  document.getElementById('game-score').textContent = `Moves: ${moves}`;
}

function handleCardClick(event){
  const card = event.currentTarget;
  if (card.classList.contains('flipped') || card.classList.contains('matched') || flippedCards.length >= 2) return;
  card.classList.add('flipped'); flippedCards.push(card);
  if (flippedCards.length === 2) {
    moves++;
    document.getElementById('game-score').textContent = `Moves: ${moves}`;
    const [card1, card2] = flippedCards;
    if (card1.dataset.symbol === card2.dataset.symbol) {
      setTimeout(() => {
        card1.classList.add('matched'); card2.classList.add('matched');
        card1.removeEventListener('click', handleCardClick); card2.removeEventListener('click', handleCardClick);
        matchedPairs++; flippedCards = [];
        if (matchedPairs === cardSymbols.length) {
          const finalScore = Math.max(1000 - (moves * 10), 100);
          endGame(finalScore);
        }
      }, 500);
    } else {
      setTimeout(() => { card1.classList.remove('flipped'); card2.classList.remove('flipped'); flippedCards = []; }, 1000);
    }
  }
}

function endGame(finalScore){
  showMessage(`Game Over! Final Score: ${finalScore}`);
  saveScore('memoryCards', finalScore).then(()=> setTimeout(()=> window.location.href='../dashboard.html',800));
}

window.addEventListener('load', ()=> initializeMemory());
