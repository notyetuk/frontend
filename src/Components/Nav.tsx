import { Link } from 'react-router-dom';

export function Nav({ user }: any) {

  function doLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    location.href = '/'
  }

  return (
    <div className="w-full bg-slate-100 shadow-md px-10 py-3 flex justify-between">
      <div>
        <Link to="/" className="mr-4">
          Home
        </Link>
        {!user ? (
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
      {!user ? null : (
        <div>
          <button type="button" onClick={doLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}
