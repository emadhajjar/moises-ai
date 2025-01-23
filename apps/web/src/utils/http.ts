import axios from 'axios';

declare const API_URL: string;

const timeout = 30_000;

export const cancelToken = axios.CancelToken;

export const http = axios.create({
  baseURL: API_URL,
  headers: { 'content-type': 'application/json' },
  timeout,
});
