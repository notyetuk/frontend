import axios from 'axios';
import { Headers } from './RequestService';
import { ConfigStore as $global } from '../Stores/ConfigStore';

const API = import.meta.env.VITE_API;

async function fetchLists(): Promise<any> {
  const response: any = await axios.get(`${API}/list`, {
    headers: {
      'Authorization': `Bearer ${localStorage.token}`
    }
  });
  return response.data;
}

async function fetchItems(listId: string): Promise<any> {
  const response: any = await axios.get(`${API}/list/${listId}`, {
    headers: Headers
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
      headers: Headers,
    }
  );
}

async function deleteList(listId: string) {
  return await axios.delete(`${$global.API}/list/${listId}`, {
    headers: Headers,
  });
}

async function saveItem(itemId: string, data: any) {
  return await axios.put(
    `${$global.API}/item/save/${itemId}`, data, {
      headers: Headers,
    });
}

async function deleteItem(itemId: string) {
  return await axios.delete(`${$global.API}/item/${itemId}`, {
    headers: Headers,
  });
}

export {
  fetchLists,
  fetchItems,
  fetchShareableList,
  updateListPrivacy,
  deleteList,
  deleteItem,
  saveItem,
};
