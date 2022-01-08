import { BaseSyntheticEvent } from 'react';

export function Modal(props: any) {
  addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      clodeModal();
    }
  });

  function handleClick(e: BaseSyntheticEvent) {
    if (e.target.id === 'bg') {
      clodeModal();
    }
  }

  function clodeModal() {
    props.handleModal();
  }

  return (
    <div
      id="bg"
      className="w-full h-full fixed bg-black bg-opacity-60 top-0 left-0 p-5"
      onClick={handleClick}
    >
      <div className="w-full md:w-2/3 lg:w-2/4 relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-md p-5 text-center">
        {props.children}
      </div>
    </div>
  );
}
