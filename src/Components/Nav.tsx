import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeSelector } from './ThemeSelector';
import { LogoutIcon } from '@heroicons/react/outline';

import { UserContext } from '../Services/AuthService';

export function Nav() {

  const user = useContext(UserContext);
  const navigate = useNavigate();

  function doLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');

    user.username = ''
    user.userId = '';

    navigate('/');
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
            <div>Welcome {user.username}!</div>
            <button type="button" onClick={doLogout}><LogoutIcon className="w-5"/></button>
          </>
        )}
      </div>
    </div>
  );
}
