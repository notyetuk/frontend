import { useState } from 'react';
import { IList } from '../Interfaces/IList';
import { Input } from './Input/Input';

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

    props.handleClick(newList);
    setTitle('');
    setCover('');
  }

  const [showForm, setShowForm] = useState<boolean>(false);
  const form                    = document.getElementById('form');

  function handleFormDisplay() {
    setShowForm(!showForm);
    form?.classList.toggle('hidden');
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

  return (
    <div className="w-full md:w-2/3 lg:w-2/4 max-w-[550px] mx-auto">
      {showForm ? (
        <button
          onClick={handleFormDisplay}
          className="button button-error md:hidden mb-3"
        >
          Cancel
        </button>
      ) : (
        <button
          onClick={handleFormDisplay}
          className="button button-primary md:hidden mb-3"
        >
          Add new List
        </button>
      )}
      <div id="form" className="hidden md:block">
        <form className="flex flex-col space-y-2 mb-10">
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
          <button
            className="button button-primary mb-5"
            type="button"
            onClick={handleSubmit}
          >
            Add List
          </button>
        </form>
      </div>
    </div>
  );
}
