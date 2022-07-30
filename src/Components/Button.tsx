interface Props {
  label: string;
  type?: any;
  class?: string;
  onButtonClick?: (value?: any) => void;
  disabled?: boolean;
}

export function Button(props: Props) {

  function onButtonClick() {
    if (props && props.onButtonClick) {
      props.onButtonClick();
    }
  }

  return(
    <>
      <button type={props.type ?? 'submit'} onClick={onButtonClick} className={'outline-none ' + props.class} disabled={props.disabled ?? false}>{props.label}</button>
    </>
  )
}
