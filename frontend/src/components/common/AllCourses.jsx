import { useEffect, useState } from "react";
import API from "./AxiosInstance";
import { useNavigate } from "react-router-dom";

function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await API.get("/get-courses");
        setCourses(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        Trending Courses
      </h2>

      <div
        style={{
          display: "flex",
          gap: "30px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {courses.length > 0 ? (
          courses.map((course) => (
            <div
              key={course._id}
              style={{
                width: "300px",
                padding: "20px",
                borderRadius: "12px",
                background: "#ffffffcc",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                transition: "0.3s",
              }}
            >
              <h3 style={{ marginBottom: "10px" }}>
                {course.C_title}
              </h3>

              <p style={{ fontSize: "14px", marginBottom: "10px" }}>
                {course.C_description}
              </p>

              <p>
                <strong>Category:</strong> {course.C_categories}
              </p>

              <p>
                <strong>Educator:</strong> {course.C_educator}
              </p>

              <p style={{ fontWeight: "bold", marginTop: "10px" }}>
                ₹ {course.C_price}
              </p>

              {/* Enroll Button */}
              <button
  style={{
    marginTop: "15px",
    width: "100%",
    padding: "8px",
    backgroundColor: "#4e73df",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  }}
  onClick={() => navigate(`/payment/${course._id}`)}
>
  Enroll Now
</button>

            </div>
          ))
        ) : (
          <p>No courses available</p>
        )}
      </div>
    </div>
  );
}

export default AllCourses;