import axios from "axios";
import {UserStore} from "../Store/UserStore";

export async function authenticate(): Promise<any> {
  const API = import.meta.env.VITE_API;
  const token = localStorage.getItem('token');
  if (token) {
    const response: any = await axios.post(`${API}/auth/verify?token=${token}`);
    UserStore.userId = response.data.id;
    UserStore.username = response.data.username;
    // return response.data;
  }
}