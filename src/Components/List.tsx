import { useNavigate } from 'react-router-dom';
import { IList } from '../Interfaces/IList';

export function List(list: IList) {
  const navigate = useNavigate();
  function openList() {
    navigate(`/lists/${list._id}`);
  }

  return (
    <div className="flex p-3 space-x-3 rounded-md border border-slate-300 bg-slate-50 text-left mb-2 relative">
      <button
        className="absolute top-5 right-5"
        onClick={() => list.handleDelete!(list._id)}
      >
        Delete
      </button>
      <div className="w-1/4">
        <img src={list.cover} onClick={openList} className="cursor-pointer" />
      </div>
      <div className="flex flex-col space-y-2">
        <div onClick={openList}>
          <div className="text-2xl cursor-pointer">{list.title}</div>
        </div>
        <div>Added on {new Date(list.createdAt).toLocaleDateString()}</div>
      </div>
    </div>
  );
}
