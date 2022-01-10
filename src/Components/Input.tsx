import { IInput } from "../Interfaces/IInput";

export function Input(props: IInput) {

  return (
    <>
      <input
        onChange={props.handleChange}
        type={props.type ?? 'text'}
        placeholder={props.placeholder}
        className={props.classes + ` py-2 px-5 border border-gray-300 rounded-md outline-none focus:border-gray-500`}
        value={props.value}
        required={props.required ?? false}
        disabled={props.disabled ?? false}
      />
    </>
  );
}
