import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IItem } from '../Interfaces/IItem';
import { fetchItems, fetchShareableList } from '../Services/ListService';
import { Layout } from './Layout';
import { Item } from '../Components/Item';
import { Input } from '../Components/Input';
import axios from 'axios';
import { ConfigStore as $global } from '../Stores/ConfigStore';
import { Headers } from '../Services/RequestService';
import { Spinner } from '../Icons/Spinner';

export function Items(props: any) {
  const { id } = useParams();
  const [items, setItems] = useState<IItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!props.isShared) {
      fetchItems(id!).then((r) => {
        setItems(r.items);
        setLoading(false);
      });
    } else {
      fetchShareableList(id!).then((r) => {
        setItems(r.items);
        setLoading(false);
      });
    }
  }, [null]);

  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');

  async function addItem(e: BaseSyntheticEvent) {
    e.preventDefault();

    // TODO: TEMP
    if (!title || !url || !image || !price) {
      return alert('fill all details');
    }

    const newItem: IItem = {
      list: id,
      title: title,
      price: price,
      url: url,
      image: image,
      createdAt: new Date(),
    };

    const { data } = await axios.post(`${$global.API}/item`, newItem, {
      headers: Headers,
    });

    setItems([data.item, ...items]);

    setTitle('');
    setPrice('');
    setUrl('');
    setImage('');
  }

  async function saveItem(newData?: any) {
    // setItems([newData, ...items]);
    const { data } = await axios.put(
      `${$global.API}/item/save/${newData.id}`,
      newData,
      {
        headers: Headers,
      }
    );

    const item: IItem = data.item[0];
    for (let i in items) {
      if (item._id === items[i]._id) {
        items.splice(parseInt(i), 1, item);
      }
    }
    setItems([...items]);
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
        {props.isShared ? null : (
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
              <div className="text-left">
                <Input
                  type="number"
                  placeholder="Price ££"
                  value={price}
                  handleChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <Input
                placeholder="Item image."
                value={image}
                handleChange={(e) => setImage(e.target.value)}
              />
              <button
                className="button button-primary"
                onClick={(e) => addItem(e)}
              >
                Add Item
              </button>
            </form>
          </div>
        )}

        {loading ? (
          <div className="w-5 mx-auto">
            <Spinner />
          </div>
        ) : items.length === 0 ? (
          'There are no items on this list.'
        ) : (
          items.map((i: IItem) => (
            <Item
              key={i._id}
              _id={i._id}
              title={i.title}
              price={i.price}
              url={i.url}
              image={i.image}
              createdAt={i.createdAt}
              handleDelete={() => deleteItem(i._id)}
              isShared={props.isShared}
              handleSave={saveItem}
            />
          ))
        )}
      </Layout>
    </>
  );
}
