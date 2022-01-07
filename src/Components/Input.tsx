interface Props {
  handleChange: (e: any) => void;
  placeholder: string;
  type?: string;
}

export function Input(props: Props) {

  return (
    <>
      <input
        onChange={props.handleChange}
        type={props.type ?? 'text'}
        placeholder={props.placeholder}
        className="py-2 px-5 border border-gray-300 rounded-md outline-none focus:border-gray-500"
      />
    </>
  );
}
