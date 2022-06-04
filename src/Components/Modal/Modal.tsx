import { BaseSyntheticEvent, useEffect } from 'react';
import './Modal.scss';

interface IModal {
  title: string;
  handleModalClose: () => void;
  children: any;
}

export function Modal(props: IModal) {
  
  useEffect(() => {
    addEventListener('keydown', (e: KeyboardEvent) => {
      if ( e.key === 'Escape' ) {
        closeModal();
      }
    });

    return () => {
      removeEventListener('keydown', () => {});
    }
  }, []);

  function handleClick(e: BaseSyntheticEvent) {
    if ( e.target.id === 'bg' ) {
      closeModal();
    }
  }

  function closeModal() {
    props.handleModalClose();
  }

  return (
    <div
      id="bg"
      className="w-full h-full fixed bg-black bg-opacity-60 top-0 left-0 p-5 z-10"
      onClick={handleClick}
    >
      <div className="modal">
        {props.title ? (
          <div className="modal_title">{props.title}</div>  
        ) : null}
        {props.children}
      </div>
    </div>
  );
}
