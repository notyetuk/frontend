import { IItem } from '../Interfaces/IItem';

export function Item(item: IItem) {
  return (
    <div className="flex p-3 space-x-3 rounded-md border border-slate-300 bg-slate-50 text-left mb-2 relative">
      {item.isShared ? null : (
        <button
          className="absolute top-5 right-5"
          onClick={() => item.handleDelete!(item._id)}
        >
          Delete
        </button>
      )}
      <div className="w-1/4">
        <img src={item.image} className="cursor-pointer" />
      </div>
      <div className="flex flex-col space-y-2">
        <div className="text-2xl cursor-pointer">
          <a target="_blank">
            {item.title}
          </a>
        </div>
        <div>£ {item.price}</div>
        <div className="text-sm">
          Added on {new Date(item.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
