import { Link } from "react-router-dom";

export function Layout({ children }: any) {
  return (
  <>
    <div>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
    {children}
  </>
  );
}
