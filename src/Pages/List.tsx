import { BaseSyntheticEvent, useContext, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { IItem } from '../Interfaces/IItem';
import {
  createItem,
  deleteItem,
  fetchItems,
  fetchShareableList,
  updateItem
} from '../Services/ListService';
import { Layout } from './Layout';
import { Input } from '../Components/Input/Input';
import { Loading } from '../Components/Loading';
import { Toast } from '../Components/Toast';
import { ItemCard } from '../Components/Cards/ItemCard';
import { UserContext } from '../Services/AuthService';

interface IToast {
  show: boolean;
  text: string;
  type: string;
}

export function List(props: any) {
  const { id }                = useParams();
  const [items, setItems]     = useState<IItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast]     = useState<IToast>({
    show: false,
    text: '',
    type: '',
  });

  const user = useContext(UserContext);
  if ( !user.username && !props.isShared ) {
    return (<Navigate to="/login"/>);
  }

  useEffect(() => {
    if ( !props.isShared ) {
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
  }, []);

  const [title, setTitle] = useState('');
  const [url, setUrl]     = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');

  // TODO: Refactor this...
  async function addItem(e: BaseSyntheticEvent) {
    e.preventDefault();

    // TODO: TEMP
    if ( !title || !url || !image || !price ) {
      return alert('fill all details');
    }

    const newItem: IItem = {
      list     : id,
      title    : title,
      price    : price,
      url      : url,
      image    : image,
      createdAt: new Date(),
    };

    const data: any = await createItem(newItem);
    setItems([data.item, ...items]);

    setTitle('');
    setPrice('');
    setUrl('');
    setImage('');

    const t: IToast = {
      show: true,
      text: 'Item Added!',
      type: 'success',
    };
    setToast(t);
    // setShowToast(true);
  }

  async function doSaveItem(newData: any) {
    const { data } = await updateItem(newData.id, newData);

    const newList = items.map(i => {
      if ( i._id === newData.id ) i = data.item[0];
      return i;
    });

    setItems(newList);
  }

  async function doDeleteItem(item: IItem) {
    await deleteItem(item._id!);
    setItems(items.filter((i) => i._id !== item._id));

    const t: IToast = {
      show: true,
      text: 'Item Deleted!',
      type: 'success',
    };
    setToast(t);
  }

  const [showForm, setShowForm] = useState<boolean>(false);
  const form                    = document.getElementById('form');

  function handleFormDisplay() {
    form?.classList.toggle('hidden');
    setShowForm(!showForm);
  }

  function closeToast() {
    const t: IToast = {
      show: false,
      text: '',
      type: '',
    };
    setToast(t);
    // setShowToast(false);
  }

  return (
    <>
      <Layout>
        {props.isShared ? null : (
          <div className="relative w-full md:w-2/3 lg:w-2/4 max-w-[550px] mx-auto">
            {showForm ? (
              <button
                onClick={handleFormDisplay}
                className="button button-error mb-3 md:hidden"
              >
                Cancel
              </button>
            ) : (
              <button
                onClick={handleFormDisplay}
                className="button button-primary mb-3 md:hidden"
              >
                Add a new Item
              </button>
            )}
            <div id="form" className="hidden md:block ease-in-out">
              <form className="flex flex-col space-y-2 mb-10">
                <Input
                  placeholder="Item name."
                  value={title}
                  handleChange={(v) => setTitle(v)}
                />
                <Input
                  placeholder="Item url."
                  value={url}
                  handleChange={(v) => setUrl(v)}
                />
                <div className="text-left">
                  <Input
                    type="number"
                    placeholder="Price ££"
                    value={price}
                    handleChange={(v) => setPrice(v)}
                  />
                </div>
                <Input
                  placeholder="Item image."
                  value={image}
                  handleChange={(v) => setImage(v)}
                />
                <button
                  className="button button-primary"
                  onClick={(e) => addItem(e)}
                >
                  Add Item
                </button>
              </form>
            </div>
          </div>
        )}

        {loading ? (
          <Loading/>
        ) : items.length === 0 ? (
          <div className="dark:text-white">There are no items on this list.</div>
        ) : (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2 w-full lg:w-2/3 mx-auto">
            {items.map((item: IItem) => (
              <ItemCard
                item={item}
                key={item._id}
                handleEditItem={doSaveItem}
                handleDeleteItem={doDeleteItem}
              />
            ))}
          </div>
        )}
        {toast.show ? (
          <Toast
            show={toast.show}
            type={toast.type}
            text={toast.text}
            closeToast={closeToast}
          />
        ) : null}
      </Layout>
    </>
  );
}
