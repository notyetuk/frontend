import { useState } from 'react';
import { IList } from '../Interfaces/IList';
import { Input } from './Input/Input';
import { Modal } from './Modal/Modal';
import { Button } from './Button';

export function NewList(props: any) {
  const [title, setTitle]                     = useState<string>('');
  const [cover, setCover]                     = useState<string>('');
  const [titleInputError, setTitleInputError] = useState<boolean>(false);
  const [coverInputError, setCoverInputError] = useState<boolean>(false);

  const newList: IList = {
    title    : title,
    cover    : cover,
    createdAt: new Date(), // not really necessary this
  };

  function handleSubmit() {
    if ( !title ) {
      setTitleInputError(true);
      setTimeout(() => setTitleInputError(false), 5000);
      return;
    }

    if ( !cover ) {
      setCoverInputError(true);
      setTimeout(() => setCoverInputError(false), 5000);
      return;
    }

    props.handleAddNewListSubmit(newList);
    setTitle('');
    setCover('');
  }

  function handleTitleChange(value: string) {
    setTitle(value);
    if ( titleInputError ) {
      setTitleInputError(false);
    }
  }

  function handleCoverChange(value: string) {
    setCover(value);
    if ( coverInputError ) {
      setCoverInputError(false);
    }
  }

  function onModalClose() {
    props.handleAddNewListClose();
  }

  return (
    <Modal title="Add a new list" handleModalClose={onModalClose}>
      <form>
        <div className="flex flex-col space-y-2">
          <Input
            handleChange={handleTitleChange}
            placeholder="List title"
            value={title}
            required={true}
            error={titleInputError}
          />
          <Input
            handleChange={handleCoverChange}
            placeholder="List cover"
            value={cover}
            required={true}
            error={coverInputError}
          />
        </div>
        <div className="flex space-x-2 mt-5">
          <Button type="button" label="Cancel" onButtonClick={onModalClose} class="button button-plain" />
          <Button type="button" label="Add List" onButtonClick={handleSubmit} class="button button-success" />
        </div>
      </form>
    </Modal>
  );
}
