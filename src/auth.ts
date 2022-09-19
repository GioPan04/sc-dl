import CryptoJS from 'crypto-js';
import IAuth from './models/IAuth';

export const generateToken = (ip: string): IAuth => {
  const salt = 'Yc8U6r8KjAKAepEA';
  const expire = new Date(Date.now() + 3600000 * 48).getTime();
  const data = String(Math.round(expire / 1000)) + ip + ' ' + salt;
  const token = CryptoJS.MD5(data).toString(CryptoJS.enc.Base64);

  return { token: token.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_'), expire: Math.round(expire / 1000)};
};