import axios from 'axios';
import { UserStore } from '../Stores/UserStore';

export async function authenticate(): Promise<any> {
  const API = import.meta.env.VITE_API;
  const token = localStorage.getItem('token');
  if (token) {
    // const response: any = await axios.post(`${API}/auth/verify?token=${token}`);
    return new Promise((resolve) => {axios
      .post(`${API}/auth/verify?token=${token}`)
      .then((r) => {
        UserStore.userId = r.data.id;
        UserStore.username = r.data.username;
        resolve(r.data.username);
      }).catch(() => {
        console.log('error');
      });
    });
    // UserStore.userId = response.data.id;
    // UserStore.username = response.data.username;
    // return response.data;
  }
}
