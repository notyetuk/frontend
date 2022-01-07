import { Link } from "react-router-dom"

export function Nav() {
  return(
    <div>
      <Link to="/" className="mr-4">Home</Link>
      <Link to="/login" className="mr-4">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  )
}