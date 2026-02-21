import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../common/AxiosInstance";

function CoursePlayer() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchCourse = async () => {
      const res = await API.get("/get-courses");
      const found = res.data.data.find(c => c._id === id);
      setCourse(found);

      if (found?.progress?.[user._id]) {
        setProgress(found.progress[user._id]);
      }
    };

    fetchCourse();
  }, [id]);

  const updateProgressInDB = async (percent) => {
    try {
      await API.post(`/progress/${id}`, {
        userId: user._id,
        progress: percent
      });
    } catch (error) {
      console.log("Progress update failed", error);
    }
  };

  const downloadCertificate = () => {
    window.open(
      `http://localhost:5000/api/certificate/${id}?userId=${user._id}`,
      "_self"
    );
  };

  if (!course) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "40px" }}>
      <h2>{course.C_title}</h2>

      {/* Progress Bar */}
      <div style={{ marginBottom: "20px" }}>
        <div
          style={{
            width: "100%",
            background: "#ddd",
            borderRadius: "10px",
            height: "20px"
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              background: "#28a745",
              height: "100%",
              borderRadius: "10px",
              transition: "0.5s"
            }}
          ></div>
        </div>
        <p>{progress}% Completed</p>
      </div>

      {/* Sections */}
      {course.sections?.map((section, index) => (
        <div key={index} style={{ marginBottom: "30px" }}>
          <h4>{section.title}</h4>
          <p>{section.content}</p>

          {section.video && (
            <video
              width="600"
              controls
              onEnded={async () => {
                const percent = Math.round(
                  ((index + 1) / course.sections.length) * 100
                );

                setProgress(percent);
                await updateProgressInDB(percent);
              }}
            >
              <source
                src={`http://localhost:5000${section.video}`}
                type="video/mp4"
              />
            </video>
          )}
        </div>
      ))}

      {/* Certificate Button */}
      {progress === 100 && (
        <button
          onClick={downloadCertificate}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Download Certificate
        </button>
      )}
    </div>
  );
}

export default CoursePlayer;