import axios from 'axios';
import { Headers } from './RequestService';

const API = import.meta.env.VITE_API;

async function fetchLists(): Promise<any> {
  const response: any = await axios.get(`${API}/list`, {
    headers: Headers
  });
  return response.data;
}

export {
  fetchLists
}