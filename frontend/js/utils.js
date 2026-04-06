import { apiRequest } from './api.js';

export function showMessage(text){
  // simple modal replacement: alert
  alert(text);
}

export async function saveScore(game, score){
  const user = JSON.parse(localStorage.getItem('activeUser') || 'null');
  if(!user) return;
  await apiRequest('/scores','POST',{ userId: user._id, game, score });
  user.scores = user.scores || {};
  user.scores[game] = Math.max(user.scores[game] || 0, score);
  localStorage.setItem('activeUser', JSON.stringify(user));
}
