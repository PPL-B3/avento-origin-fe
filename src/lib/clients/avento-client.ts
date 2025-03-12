import axios from 'axios';
import { getCookie } from 'cookies-next';

export const aventoClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

aventoClient.interceptors.request.use((config) => {
  const token = getCookie('token');
  if (token) {
    const tokenStr = typeof token === 'string' ? token : String(token);
    config.headers.Authorization = `Bearer ${tokenStr}`;
  }
  return config;
});
