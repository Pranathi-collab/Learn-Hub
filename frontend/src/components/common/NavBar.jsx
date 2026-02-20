import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "15px 60px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
      }}
    >
      <h2 style={{ color: "#4e73df" }}>LearnHub</h2>

      <div>
        <Link to="/" style={{ margin: "0 15px" }}>Home</Link>
        <Link to="/get-courses" style={{ margin: "0 15px" }}>Courses</Link>

        {!user && (
          <>
            <Link to="/login" style={{ margin: "0 15px" }}>Login</Link>
            <Link to="/register" style={{ margin: "0 15px" }}>Register</Link>
          </>
        )}

        {user && (
          <>
            <Link to="/dashboard" style={{ margin: "0 15px" }}>Dashboard</Link>
            <button
              onClick={logout}
              style={{
                padding: "6px 15px",
                borderRadius: "5px",
                border: "none",
                background: "red",
                color: "white"
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default NavBar;
