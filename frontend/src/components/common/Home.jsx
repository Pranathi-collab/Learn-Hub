import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="hero">
        <div>
          <h1>
            Small App, Big Dreams:<br />
            Elevating Your Education
          </h1>
          <Link to="/courses" className="btn btn-warning mt-4">
            Explore Courses
          </Link>
        </div>
      </div>
    </>
  );
}

