export function Toast(props: any) {

  // clearTimeout();
  // setTimeout(() => {
  //   props.closeToast();
  // }, 6000);

  if (props.show) {
    return (
      <>
        <div
          className={`absolute top-5 left-1/2 -translate-x-1/2 px-10 py-4 bg-white rounded-md shadow-lg border cursor-pointer border-slate-400
        ${props.type === 'success' ? 'text-green-600' : ''}
        ${props.type === 'error' ? 'text-red-600' : ''}
        ${props.type === 'info' ? 'text-sky-700' : ''}`}
          onClick={props.closeToast}
        >
          {props.text}
        </div>
      </>
    );
  }

  return <></>;
}
