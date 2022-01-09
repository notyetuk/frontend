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
  }

  function handleSubmit() {

    // TODO: TEMP
    if (!title || !cover) {
      return alert('fill all details');
    }
    
    props.handleClick(newList);
    setTitle('');
    setCover('');
  }

  return (
    <div>
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
  );
}
