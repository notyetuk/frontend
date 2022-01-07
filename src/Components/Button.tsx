interface Props {
  label: string;
  class?: string;
}

export function Button(props: Props) {

  return(
    <>
      <button className={props.class}>{props.label}</button>
    </>
  )
}