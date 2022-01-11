import { useState } from 'react';
import { IList } from '../Interfaces/IList';
import { Input } from './Input';

export function NewList(props: any) {
  const [title, setTitle] = useState<string>('');
  const [cover, setCover] = useState<string>('');

  const newList: IList = {
    title: title,
    cover: cover,
    createdAt: new Date(), // not really necessary this
  };

  function handleSubmit() {
    // TODO: TEMP
    if (!title || !cover) {
      return alert('fill all details');
    }

    props.handleClick(newList);
    setTitle('');
    setCover('');
  }

  const [showForm, setShowForm] = useState<boolean>(false);
  const form = document.getElementById('form');

  function handleFormDisplay() {
    setShowForm(!showForm);
    form?.classList.toggle('hidden');
  }

  return (
    <div>
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
            handleChange={(e) => setTitle(e.target.value)}
            placeholder="List title"
            value={title}
            required={true}
          />
          <Input
            handleChange={(e) => setCover(e.target.value)}
            placeholder="List cover"
            value={cover}
            required={true}
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
