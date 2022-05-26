import { useContext } from 'react';
import { UserContext } from '../../Services/AuthService';

interface AvatarProps {
  handleClick: () => void;
}

export function Avatar(props: AvatarProps) {
  const user = useContext(UserContext);

  return (
    <>
      <img className="w-[25px] h-[25px] rounded-full"
           src={`${import.meta.env.VITE_API}/user/avatar/${user.username}`} alt={user.username}
           onClick={props.handleClick}/>
    </>
  );
}
