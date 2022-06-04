import { useState } from 'react';
import { Button } from './Button';
import { Input } from './Input/Input';
import { Modal } from './Modal/Modal';

interface INewItem {
  onAddNewItemClose: () => void;
  onAddNewItemSubmit: (value: any) => void;
}

export function NewItem(props: INewItem) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  
  function addItem() {
    if (!title.trim() || !url.trim() || !image.trim() || !price.trim()) {
      console.log('fill up all details.');
      return;
    }

    props.onAddNewItemSubmit({
      title,
      url,
      image,
      price,
    });

    setTitle('');
    setUrl('');
    setImage('');
    setPrice('');
    handleModalClose();
  }

  function handleModalClose() {
    props.onAddNewItemClose();
  }

  function onTitleChange(value: string) {
    setTitle(value);
  }

  function onUrlChange(value: string) {
    setUrl(value);
  }

  function onImageChange(value: string) {
    setImage(value);
  }

  function onPriceChange(value: string) {
    setPrice(value);
  }

  return ( 
    <Modal title="Add a new Item" handleModalClose={handleModalClose} >
      <div className="flex flex-col space-y-2">
        <Input
          placeholder="Item name."
          value={title}
          handleChange={onTitleChange}
        />
        <Input
          placeholder="Item url."
          value={url}
          handleChange={onUrlChange}
        />
        <div className="text-left">
          <Input
            type="number"
            placeholder="Price ££"
            value={price}
            handleChange={onPriceChange}
          />
        </div>
        <Input
          placeholder="Item image."
          value={image}
          handleChange={onImageChange}
        />
      </div>
      <div className="flex space-x-2 mt-5">
        <Button label="Cancel" class="button button-plain" onButtonClick={handleModalClose} />
        <Button label="Submit" class="button button-success" onButtonClick={addItem} />  
      </div>
    </Modal>
  );
}
