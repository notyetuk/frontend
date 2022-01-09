import { useNavigate } from 'react-router-dom';
import { IList } from '../Interfaces/IList';
import { Bin } from '../Icons/Bin';
import { Edit } from '../Icons/Edit';

export function List(list: IList) {
  const navigate = useNavigate();
  function openList() {
    navigate(`/lists/${list._id}`);
  }

  return (
    <div className="flex p-3 space-x-3 rounded-md border border-slate-300 bg-slate-50 text-left mb-2 relative">
      <div className="absolute right-3 flex space-x-2">
        <button
          className="button-success text-white p-1 rounded-full outline-none"
          onClick={() => list.handleEdit!(list._id)}
        >
          <Edit classes="w-4 h-4" />
        </button>
        <button
          className="button-error text-white p-1 rounded-full outline-none"
          onClick={() => list.handleDelete!(list._id)}
        >
          <Bin classes="w-4 h-4" />
        </button>
      </div>
      <div className="w-1/4">
        <img src={list.cover} onClick={openList} className="cursor-pointer" />
      </div>
      <div className="flex flex-col space-y-2">
        <div onClick={openList}>
          <div className="text-2xl cursor-pointer">{list.title}</div>
        </div>
        <div>
          Total: £{list.total === '0' ? '0' : list.total}
        </div>
        <div className="text-sm">
          Added on {new Date(list.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
