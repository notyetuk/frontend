import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeSelector } from '../ThemeSelector';
import { LogoutIcon } from '@heroicons/react/outline';

import { UserContext } from '../../Services/AuthService';
import { Avatar } from '../User/Avatar';
import { UploadAvatar } from '../User/UploadAvatar';

export function Nav() {

  const user = useContext(UserContext);
  const navigate = useNavigate();

  const [isUploading, setIsUploading] = useState(false);

  function doLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');

    user.username = ''
    user.userId = '';

    navigate('/');
  }

  function onAvatarClick() {
    setIsUploading(!isUploading);
  }

  return (
    <div
      className="w-full px-10 py-3 flex justify-between bg-$light-nav dark:bg-$dark-nav dark:text-white smooth shadow-md">
      <div>
        <Link to="/" className="mr-4">
          Home
        </Link>
        {!user.username ? (
          <>
            <Link to="/login" className="mr-4">
              Login
            </Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <Link to="/list">Lists</Link>
        )}
      </div>
      <div className="flex space-x-5">
        <ThemeSelector/>
        {!user.username ? null : (
          <>
            <Avatar handleClick={onAvatarClick} />
            <div className="hidden md:block">Welcome {user.username}!</div>
            <button type="button" onClick={doLogout}><LogoutIcon className="w-5"/></button>
          </>
        )}
      </div>
      {(!isUploading) ? null :
        <UploadAvatar handleClose={onAvatarClick} />
      }
    </div>
  );
}
