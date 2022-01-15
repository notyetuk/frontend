import { useRef } from 'react';
import { IInput } from '../Interfaces/IInput';

export function Input(props: IInput) {
  const value: any = useRef('');

  return (
    <>
      <input
        onChange={() => props.handleChange!(value.current.value)}
        type={props.type ?? 'text'}
        placeholder={props.placeholder}
        className={
          props.classes +
          ` py-2 px-5 border border-gray-300 rounded-md outline-none focus:border-gray-500`
        }
        value={props.value}
        required={props.required ?? false}
        disabled={props.disabled ?? false}
        ref={value}
      />
    </>
  );
}
