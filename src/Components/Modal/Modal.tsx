import { BaseSyntheticEvent } from 'react';
import { useTheme } from '../../Hooks/useTheme';
import './Modal.scss';

export function Modal(props: any) {
  const [theme] = useTheme();

  addEventListener('keydown', (e: KeyboardEvent) => {
    if ( e.key === 'Escape' ) {
      closeModal();
    }
  });

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
        {props.children}
      </div>
    </div>
  );
}
