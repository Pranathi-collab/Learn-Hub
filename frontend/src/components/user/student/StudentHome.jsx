import { useEffect, useState } from "react";
import API from "../../common/AxiosInstance";
import { useNavigate } from "react-router-dom";

function StudentHome() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await API.get("/get-courses");

        if (Array.isArray(res.data)) {
          setCourses(res.data);
        } else if (Array.isArray(res.data.data)) {
          setCourses(res.data.data);
        } else {
          setCourses([]);
        }
      } catch (error) {
        console.log(error);
        setCourses([]);
      }
    };

    fetchCourses();
  }, []);

  // 🔥 FIXED FILTER
  const filteredCourses = courses.filter((course) =>
    course.C_title?.toLowerCase().includes(search.toLowerCase())
  );

  const buttonStyle = {
    marginTop: "10px",
    width: "100%",
    padding: "10px",
    backgroundColor: "#4e73df",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  };

  // 🔥 UPDATE PROGRESS
  const updateProgress = async (courseId, percent) => {
    try {
      await API.post(`/progress/${courseId}`, {
        userId: user._id,
        progress: percent,
      });

      const res = await API.get("/get-courses");
      setCourses(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
        Student Dashboard
      </h2>

      {/* 🔍 Search */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <input
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {/* 📚 Course Cards */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
          justifyContent: "center",
        }}
      >
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => {
            const isEnrolled =
              course.enrolledStudents?.includes(user?._id);

            const userProgress =
              course.progress?.[user._id] || 0;

            return (
              <div
                key={course._id}
                style={{
                  width: "320px",
                  background: "#f5e6cc",
                  padding: "20px",
                  borderRadius: "10px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                }}
              >
                <h3>{course.C_title}</h3>
                <p><strong>Category:</strong> {course.C_categories}</p>
                <p><strong>Price:</strong> ₹{course.C_price}</p>

                {!isEnrolled ? (
                  <button
                    style={buttonStyle}
                    onClick={() =>
                      navigate(`/payment/${course._id}`)
                    }
                  >
                    Start Course
                  </button>
                ) : (
                  <>
                    {/* 🎥 Video */}
                    {course.sections?.[0]?.video && (
                      <video
                        width="100%"
                        controls
                        style={{ marginTop: "10px", borderRadius: "8px" }}
                      >
                        <source
                          src={`http://localhost:5000${course.sections[0].video}`}
                          type="video/mp4"
                        />
                      </video>
                    )}

                    {/* 📊 Progress Bar */}
                    <div
                      style={{
                        marginTop: "10px",
                        background: "#ddd",
                        height: "8px",
                        borderRadius: "5px",
                      }}
                    >
                      <div
                        style={{
                          width: `${userProgress}%`,
                          height: "8px",
                          background: "green",
                          borderRadius: "5px",
                        }}
                      />
                    </div>

                    {/* ✅ Complete Button */}
                    {userProgress < 100 && (
                      <button
                        style={buttonStyle}
                        onClick={() =>
                          updateProgress(course._id, 100)
                        }
                      >
                        Complete Course
                      </button>
                    )}

                    {/* 🎓 Certificate */}
                    {userProgress === 100 && (
                      <button
                        style={{
                          ...buttonStyle,
                          backgroundColor: "green",
                        }}
                        onClick={() =>
                          window.open(
                            `http://localhost:5000/api/certificate/${course._id}?userId=${user._id}`,
                            "_blank"
                          )
                        }
                      >
                        Download Certificate
                      </button>
                    )}
                  </>
                )}
              </div>
            );
          })
        ) : (
          <p>No courses available</p>
        )}
      </div>
    </div>
  );
}

export default StudentHome;