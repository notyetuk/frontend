import axios from 'axios';
import { UserStore } from '../Stores/UserStore';
import { createContext } from 'react';

export const UserContext = createContext(UserStore);

export async function authenticate(): Promise<any> {
  const API   = import.meta.env.VITE_API;
  const token = localStorage.getItem('token');
  if ( token ) {
    return new Promise((resolve, reject) => {
      axios.post(`${API}/auth/verify?token=${token}`)
        .then((r) => {
          UserStore.userId   = r.data.id;
          UserStore.username = r.data.username;
          return resolve(null);
        }).catch((error) => {
        return reject(error);
      });
    });
  }
}
