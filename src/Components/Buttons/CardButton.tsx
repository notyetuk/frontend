import './card-button.scss';

interface IPill {
  value: string;
  handleButtonClick: () => void;
  children: any;
  color?: string;
}

export function CardButton(props: IPill) {

  function onButtonClick(event: any) {
    if ( event ) {
      event.preventDefault();
      event.stopPropagation();
    }

    return props.handleButtonClick();
  }

  const color = props.color === 'red' ? 'bg-red-500' : props.color === 'green' ? 'bg-green-500' : 'bg-blue-500';

  return (
    <button className={'card-button smooth ' + color} onClick={onButtonClick}>
      {props.children}
    </button>
  );
}
