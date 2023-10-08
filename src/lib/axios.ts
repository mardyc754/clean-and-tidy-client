import axios from 'axios';

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export const fetcher = axios.create({
  baseURL: BACKEND_BASE_URL
});
