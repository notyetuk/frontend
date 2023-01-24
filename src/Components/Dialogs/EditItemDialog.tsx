import { Input } from '../Input/Input';
import { Modal } from '../Modal/Modal';
import { useState } from 'react';
import { IItem } from '../../Interfaces/IItem';

interface IEditItemDialog {
  item: IItem;
  handleItemSave: (item: any) => void;
  handleDialogClose: () => void;
}

export function EditItemDialog(props: IEditItemDialog) {

  const [newTitle, setNewTitle] = useState(props.item.title);
  const [newUrl, setNewUrl]     = useState(props.item.url);
  const [newPrice, setNewPrice] = useState(props.item.price);
  const [newImage, setNewImage] = useState(props.item.image);

  function handleTitleChange(value: string) {
    setNewTitle(value);
  }

  function handleUrlChange(value: string) {
    setNewUrl(value);
  }

  function handlePriceChange(value: string) {
    setNewPrice(value);
  }

  function handleCoverChange(value: string) {
    setNewImage(value);
  }

  function saveItem() {
    const item = {
      id   : props.item._id,
      title: newTitle,
      url  : newUrl,
      price: newPrice,
      image: newImage,
    };

    props.handleItemSave(item);
  }

  return (
    <>
      <Modal title="Editing the item" handleModalClose={props.handleDialogClose}>
        <div className="flex flex-col space-y-2">
          <Input
            value={newTitle}
            handleChange={handleTitleChange}
          />
          <Input
            value={newUrl}
            handleChange={handleUrlChange}
          />
          <Input
            value={newPrice}
            type="number"
            handleChange={handlePriceChange}
          />
          <Input
            value={newImage}
            handleChange={handleCoverChange}
          />

          <div className="flex justify-start space-x-2">
            <button className="button button-primary" onClick={saveItem}>
              Save
            </button>
            <button className="button button-plain" onClick={props.handleDialogClose}>
              Close
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
