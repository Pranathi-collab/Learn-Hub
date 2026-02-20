import { useNavigate } from "react-router-dom";
import heroImg from "../../assets/hero.jpg"; // Add image inside assets

function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "90vh",
        backgroundImage: `url(${heroImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        color: "white"
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.6)"
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingLeft: "80px"
        }}
      >
        <h1 style={{ fontSize: "60px", fontWeight: "bold" }}>
          Upgrade Your Skills <br /> with LearnHub
        </h1>

        <p style={{ fontSize: "20px", marginTop: "20px" }}>
          Explore industry-ready courses and enhance your career.
        </p>

        <button
          onClick={() => navigate("/get-courses")}
          style={{
            marginTop: "30px",
            padding: "12px 25px",
            fontSize: "16px",
            borderRadius: "6px",
            border: "none",
            background: "#4e73df",
            color: "white",
            width: "180px"
          }}
        >
          Browse Courses
        </button>
      </div>
    </div>
  );
}

export default Home;
