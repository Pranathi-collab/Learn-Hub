import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./AxiosInstance";
import heroImg from "../../assets/hero.jpg";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post("/auth/login", form);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    navigate("/dashboard");
  };

  return (
    <div
      style={{
        height: "90vh",
        backgroundImage: `url(${heroImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "rgba(255,255,255,0.95)",
          padding: "40px",
          borderRadius: "15px",
          width: "400px"
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Login</h2>

        <input
          type="email"
          placeholder="Email"
          style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
          onChange={(e)=>setForm({...form,email:e.target.value})}
        />

        <input
          type="password"
          placeholder="Password"
          style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
          onChange={(e)=>setForm({...form,password:e.target.value})}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "#4e73df",
            color: "white",
            border: "none",
            borderRadius: "5px"
          }}
        >
          Login
        </button>
        <p style={{ marginTop: "15px", textAlign: "center" }}>
          New user?{" "}
        <span
        style={{ color: "#4e73df", cursor: "pointer", fontWeight: "bold" }}
        onClick={() => navigate("/register")}
         >
         Register here
        </span>
         </p>

      </form>
    </div>
  );
}

export default Login;
