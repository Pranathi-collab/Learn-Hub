import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="hero d-flex justify-content-center align-items-center">
      <div className="card-glass col-md-4">
        <h3 className="text-center mb-4">Register</h3>

        <input
          className="form-control mb-3"
          placeholder="Full Name"
        />

        <input
          className="form-control mb-3"
          placeholder="Email Address"
        />

        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
        />

        <select className="form-select mb-3">
          <option>Select User</option>
          <option>Student</option>
          <option>Teacher</option>
        </select>

        <button className="btn btn-primary w-100">
          SIGN UP
        </button>

        <p className="mt-3 text-center">
          Already have an account?{" "}
          <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
