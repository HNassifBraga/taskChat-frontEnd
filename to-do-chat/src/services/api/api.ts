import axios from 'axios';

// Em dev, deixamos vazio: o Axios usa '/api' (relativo) e o proxy do Vite
// encaminha para o backend, fazendo o navegador ver tudo como mesma origem
// (assim o cookie de autentica\u00e7\u00e3o funciona). Em produ\u00e7\u00e3o, defina VITE_API_URL.
const BACKEND_URL = import.meta.env.VITE_API_URL ?? '';

// Usado pelo Socket.IO. Vazio => mesma origem (proxy do Vite cuida do /socket.io).
export const apiBaseURL = BACKEND_URL;

export const api = axios.create({
  baseURL: BACKEND_URL ? BACKEND_URL : '/api',
  timeout: 30000,
  withCredentials:true,
  headers: {
    'Content-Type': 'application/json',
  },
});