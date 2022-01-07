export function Toast(props: any) {
  if (props.show) {
    return (
      <>
        <div
          className={`absolute top-5 left-5 px-5 py-2 bg-opacity-50 rounded-md shadow border-2 cursor-pointer text-white
        ${props.type === 'success' ? 'bg-emerald-400 border-emerald-500' : ''}
        ${props.type === 'error' ? 'bg-red-400 border-red-500' : ''}`}
          onClick={props.closeToast}
        >
          {props.text}
        </div>
      </>
    );
  }

  return <></>;
}
