import { apiRequest } from './api.js';

export async function loadLeaderboard(containerId){
  const top = await apiRequest('/leaderboard','GET');
  const html = top.map((t, i)=>`<div class="flex justify-between py-1 border-b border-gray-700"><div>${i+1}. ${t.userId.displayName}</div><div>${t.score}</div></div>`).join('');
  document.getElementById(containerId).innerHTML = html;
}
