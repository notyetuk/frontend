import { useState } from 'react';
import { IItem } from '../Interfaces/IItem';
import { Modal } from './Modal';
import { Input } from './Input/Input';
import { ItemCard } from './Cards/ItemCard';

export function Item(item: IItem) {
  const [modalShow, setModalShow] = useState(false);
  const [newTitle, setNewTitle]   = useState('');
  const [newUrl, setNewUrl]       = useState('');
  const [newPrice, setNewPrice]   = useState('');
  const [newImage, setNewImage]   = useState('');

  function handleEdit() {
    setNewTitle(item.title);
    setNewUrl(item.url);
    setNewPrice(item.price);
    setNewImage(item.image);

    setModalShow(true);
  }

  function closeModal() {
    setModalShow(false);
  }

  function saveItem() {
    item.handleSave!({
      id   : item!._id,
      title: newTitle,
      url  : newUrl,
      price: newPrice,
      image: newImage,
    });
    setModalShow(false);
  }

  return (
    <>
      {/*<div className="flex p-3 space-x-3 rounded-md border border-slate-300 bg-slate-50 text-left mb-2 relative shadow hover:shadow-md">*/}
      {/*  {item.isShared ? null : (*/}
      {/*    <div className="absolute top-3 right-3 space-x-2">*/}
      {/*      <button*/}
      {/*        className="button-success text-white p-1 rounded-full outline-none"*/}
      {/*        onClick={handleEdit}*/}
      {/*      >*/}
      {/*        <Edit classes="w-4 h-4" />*/}
      {/*      </button>*/}
      {/*      <button*/}
      {/*        className="button-error text-white p-1 rounded-full outline-none"*/}
      {/*        onClick={() => item.handleDelete!(item._id)}*/}
      {/*      >*/}
      {/*        <Bin classes="w-4 h-4" />*/}
      {/*      </button>*/}
      {/*    </div>*/}
      {/*  )}*/}
      {/*  <div className="w-1/4">*/}
      {/*    <a href={item.url} target="_blank"><img src={item.image} className="cursor-pointer object-cover h-full" /></a>*/}
      {/*  </div>*/}
      {/*  <div className="flex flex-col space-y-2">*/}
      {/*    <div className="text-2xl cursor-pointer">*/}
      {/*      <a href={item.url} target="_blank">*/}
      {/*        {item.title}*/}
      {/*      </a>*/}
      {/*    </div>*/}
      {/*    <div>£ {parseFloat(item.price).toFixed(2)}</div>*/}
      {/*    <div className="text-sm">*/}
      {/*      Added on {new Date(item.createdAt).toLocaleDateString()}*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
      <ItemCard item={item}/>
      {modalShow ? (
        <Modal handleModal={closeModal}>
          <div className="mb-4 text-xl">Editing the item.</div>
          <div className="flex flex-col space-y-2">
            <Input
              value={newTitle}
              handleChange={(v) => setNewTitle(v)}
            />
            <Input
              value={newUrl}
              handleChange={(v) => setNewUrl(v)}
            />
            <Input
              value={newPrice}
              type="number"
              handleChange={(v) => setNewPrice(v)}
            />
            <Input
              value={newImage}
              handleChange={(v) => setNewImage(v)}
            />

            <div className="flex justify-start space-x-2">
              <button onClick={saveItem} className="button button-primary">
                Save
              </button>
              <button onClick={closeModal} className="button button-plain">
                Close
              </button>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
}
