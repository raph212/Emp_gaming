import { apiRequest } from './api.js';

export async function redeemCoupon(code, email){
  return await apiRequest('/coupons/redeem','POST',{ code, email });
}
