import axios from 'axios';
import { ConfigStore as $global } from '../Stores/ConfigStore';

const API = import.meta.env.VITE_API;

async function fetchLists(): Promise<any> {
  const response: any = await axios.get(`${API}/list`, {
    headers: { ...authHeaders() },
  });
  return response.data;
}

async function createList(data: any) {
  const response: any = await axios.post(`${$global.API}/list`, data, {
    headers: { ...authHeaders() },
  });
  return response.data;
}

async function updateList(listId: string, data: any) {
  return await axios.put(`${$global.API}/list/${listId}`, data, {
    headers: { ...authHeaders() },
  });
}

async function fetchItems(listId: string): Promise<any> {
  const response: any = await axios.get(`${API}/list/${listId}`, {
    headers: { ...authHeaders() },
  });
  return response.data;
}

async function fetchShareableList(listId: string): Promise<any> {
  const response: any = await axios.get(`${API}/share/l/${listId}`);
  return response.data;
}

async function updateListPrivacy(listId: string, isPrivate: boolean) {
  const data = { isPrivate: !isPrivate };
  return await axios.put(`${$global.API}/list/privacy/${listId}`, data, {
      headers: { ...authHeaders() },
    }
  );
}

async function deleteList(listId: string) {
  return await axios.delete(`${$global.API}/list/${listId}`, {
    headers: { ...authHeaders() },
  });
}

async function createItem(data: any) {
  const response: any = await axios.post(`${$global.API}/item`, data, {
    headers: { ...authHeaders() },
  });
  return response.data;
}

async function updateItem(itemId: string, data: any) {
  return await axios.put(
    `${$global.API}/item/save/${itemId}`, data, {
      headers: { ...authHeaders() },
    });
}

async function deleteItem(itemId: string) {
  return await axios.delete(`${$global.API}/item/${itemId}`, {
    headers: { ...authHeaders() },
  });
}

function authHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`
  };
}

export {
  fetchLists,
  createList,
  updateList,
  createItem,
  fetchItems,
  fetchShareableList,
  updateListPrivacy,
  deleteList,
  deleteItem,
  updateItem,
};
