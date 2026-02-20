import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "./AxiosInstance";
import heroImg from "../../assets/hero.jpg";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    type: "student"
  });

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await API.post("/auth/register", form);
    alert("Registered Successfully");
    navigate("/login");
  } catch (error) {
    alert(error.response?.data?.message || "Registration Failed");
  }
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
        <h2 style={{ marginBottom: "20px" }}>Register</h2>

        <input
          placeholder="Name"
          style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
          onChange={(e)=>setForm({...form,name:e.target.value})}
        />

        <input
          placeholder="Email"
          style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
          onChange={(e)=>setForm({...form,email:e.target.value})}
        />

        <input
          type="password"
          placeholder="Password"
          style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
          onChange={(e)=>setForm({...form,password:e.target.value})}
        />

        <select
          style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
          onChange={(e)=>setForm({...form,type:e.target.value})}

        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

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
          Register
        </button>
        <p style={{ marginTop: "15px", textAlign: "center" }}>
         Already registered?{" "}
        <span
         style={{ color: "#4e73df", cursor: "pointer", fontWeight: "bold" }}
        onClick={() => navigate("/login")}
       >
         Login here
          </span>
        </p>

      </form>
    </div>
  );
}

export default Register;
