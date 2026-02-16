import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="hero d-flex justify-content-center align-items-center">
      <div className="card-glass col-md-4">
        <h3 className="text-center mb-4">Sign In</h3>

        <input
          className="form-control mb-3"
          placeholder="Email Address"
        />

        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
        />

        <button className="btn btn-primary w-100">
          SIGN IN
        </button>

        <p className="mt-3 text-center">
          Don't have an account?{" "}
          <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
