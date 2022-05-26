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
           src={`http://localhost:8081/user/avatar/${user.username}`} alt={user.username}
           onClick={props.handleClick}/>
    </>
  );
}
