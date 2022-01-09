import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IItem } from '../Interfaces/IItem';
import { fetchItems } from '../Services/ListService';
import { Layout } from './Layout';
import { Item } from '../Components/Item';
import { Input } from '../Components/Input';
import axios from 'axios';
import { ConfigStore as $global } from '../Stores/ConfigStore';
import { Headers } from '../Services/RequestService';

export function Items() {
  const { id } = useParams<string>();
  const [items, setItems] = useState<IItem[]>([]);

  useEffect(() => {
    fetchItems(id).then((r) => {
      setItems(r.items);
    });
  }, [null]);

  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [image, setImage] = useState('');

  async function addItem(e: BaseSyntheticEvent) {
    e.preventDefault();

    // TODO: TEMP
    if (!title || !url || !image) {
      return alert('fill all details');
    }

    const newItem: IItem = {
      list: id,
      title: title,
      url: url,
      image: image,
      createdAt: new Date(),
    };

    const { data } = await axios.post(`${$global.API}/item`, newItem, {
      headers: Headers,
    });

    setItems([data.item, ...items]);

    setTitle('');
    setUrl('');
    setImage('');
  }

  async function deleteItem(itemId?: string) {
    const { data } = await axios.delete(`${$global.API}/item/${itemId}`, {
      headers: Headers,
    });
    setItems(items.filter((i) => i._id !== itemId));
  }

  return (
    <>
      <Layout>
        <div>
          <form className="flex flex-col space-y-2 mb-10">
            <Input
              placeholder="Item name."
              value={title}
              handleChange={(e) => setTitle(e.target.value)}
            />
            <Input
              placeholder="Item url."
              value={url}
              handleChange={(e) => setUrl(e.target.value)}
            />
            <Input
              placeholder="Item image."
              value={image}
              handleChange={(e) => setImage(e.target.value)}
            />
            <button className="button button-primary" onClick={(e) => addItem(e)}>
              Add Item
            </button>
          </form>
        </div>

        {items.length === 0
          ? 'You have no items on your list.'
          : items.map((i: IItem) => (
              <Item
                key={i._id}
                title={i.title}
                url={i.url}
                image={i.image}
                createdAt={i.createdAt}
                handleDelete={() => deleteItem(i._id)}
              />
            ))}
      </Layout>
    </>
  );
}
