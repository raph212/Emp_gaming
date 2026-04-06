const isLocal = window.location.hostname === 'localhost';
export const BASE_URL = isLocal ? 'http://localhost:5000/api' : '/api';

export async function apiRequest(endpoint, method='GET', data=null){
  const opts = { method, headers: { 'Content-Type': 'application/json' } };
  if(data) opts.body = JSON.stringify(data);
  const res = await fetch(BASE_URL + endpoint, opts);
  const json = await res.json();
  return json;
}
