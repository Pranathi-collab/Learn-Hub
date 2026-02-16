import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">
        LearnHub
      </Link>

      <div className="ms-auto">
        <Link className="btn btn-outline-light me-2" to="/courses">
          Courses
        </Link>

        <Link className="btn btn-outline-light me-2" to="/login">
          Login
        </Link>

        <Link className="btn btn-warning" to="/register">
          Register
        </Link>
      </div>
    </nav>
  );
}
