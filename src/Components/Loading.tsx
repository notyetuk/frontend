export function Loading() {
  return (
    <div className="w-full bg-red bg-white p-3 rounded-lg shadow-sm border border-gray-300">
      <div className="animate-pulse">
        <div className="w-full py-2 bg-slate-200 rounded-md mb-3"></div>
        <div className="w-2/4 py-2 bg-slate-200 rounded-md mb-3"></div>
        <div className="w-1/4 py-2 bg-slate-200 rounded-md mb-3"></div>
        <div className="w-2/4 py-2 bg-slate-200 rounded-md"></div>
      </div>
    </div>
  );
}
