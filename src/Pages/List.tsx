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
import { Loading } from '../Components/Loading';
import { Toast } from '../Components/Toast';
import { ItemCard } from '../Components/Cards/ItemCard';
import { UserContext } from '../Services/AuthService';
import { NewItem } from '../Components/NewItem';
import { Button } from '../Components/Button';

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
  const [isAdding, setIsAdding] = useState(false);

  const user = useContext(UserContext);
  if ( !user.username && !props.isShared ) {
    return (<Navigate to="/login"/>);
  }

  useEffect(() => {
    if (!id) throw new Error('No List id provided.');

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

  async function addItem({title, url, image, price}) {
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

  function closeToast() {
    const t: IToast = {
      show: false,
      text: '',
      type: '',
    };
    setToast(t);
    // setShowToast(false);
  }

  function onAddNewItemClose() {
    setIsAdding(false);
  }

  return (
    <>
      <Layout>
        {props.isShared ? null : (
          <div className="w-full lg:w-2/3 mx-auto text-left mb-5">
            <Button label="Add Item" onButtonClick={() => setIsAdding(true)} class="button button-primary" />
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
      {isAdding ? (
        <NewItem onAddNewItemSubmit={addItem} onAddNewItemClose={onAddNewItemClose} />
      ) : null}
    </>
  );
}
