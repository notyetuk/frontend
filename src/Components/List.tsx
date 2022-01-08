import { IList } from '../Interfaces/IList';

export function List(list: IList) {
  return (
    <div className="flex p-3 space-x-3 rounded-md border border-slate-300 bg-slate-50 text-left mb-2 relative">
      <button className='absolute top-5 right-5' onClick={() => list.handleDelete!(list._id)}>Delete</button>
      <div className="w-1/4">
        <img src={list.cover} />
      </div>
      <div className="flex flex-col space-y-2">
        <div className="text-2xl">{list.title}</div>
        <div>Added on {new Date(list.createdAt).toLocaleDateString()}</div>
      </div>
    </div>
  );
}
