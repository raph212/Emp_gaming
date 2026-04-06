import { apiRequest } from './api.js';

export async function register(displayName, password){
  return await apiRequest('/users/register','POST',{ displayName, password });
}
export async function login(displayName, password){
  return await apiRequest('/users/login','POST',{ displayName, password });
}
localStorage.setItem('activeUser', JSON.stringify(res));
window.location.href = 'dashboard.html';
