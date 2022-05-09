import { useEffect, useRef, useState } from 'react';
import { IInput } from '../../Interfaces/IInput';
import './Input.css';

export function Input(props: IInput) {
  const value: any = useRef('');
  const [isErrored, setIsErrored] = useState<string>('');

  useEffect(() => {
    props.error ? setIsErrored('!outline-red-500') : setIsErrored('');
  }, [props.error]);

  return (
    <>
      <input
        onChange={() => props.handleChange!(value.current.value)}
        type={props.type ?? 'text'}
        placeholder={props.placeholder}
        className={`${props.classes} input smooth-transform ${isErrored}`}
        value={props.value}
        required={props.required ?? false}
        disabled={props.disabled ?? false}
        ref={value}
      />
    </>
  );
}
