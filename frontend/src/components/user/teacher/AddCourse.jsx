import { useState } from "react";
import API from "../../common/AxiosInstance";

function AddCourse() {
  const [course, setCourse] = useState({
    title: "",
    description: "",
    category: "",
    educator: "",
    price: 0,
    sections: []
  });

  const [section, setSection] = useState({
    title: "",
    content: ""
  });

  const addSection = () => {
    setCourse({
      ...course,
      sections: [...course.sections, section]
    });
    setSection({ title: "", content: "" });
  };
   
  const submitCourse = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    const formData = new FormData();

    formData.append("userId", user._id);
    formData.append("C_educator", user.name);
    formData.append("C_title", course.title);
    formData.append("C_categories", course.category);
    formData.append("C_price", course.price);
    formData.append("C_description", course.description);
    formData.append("sections", JSON.stringify(course.sections));

    if (course.sections.length > 0 && course.sections[0].file) {
      formData.append("video", course.sections[0].file);
    }

    await API.post("/add-course", formData);

    alert("Course Added Successfully!");
  } catch (error) {
    console.log("UPLOAD ERROR:", error);
  }
};

 const inputStyle = {
  flex: 1,
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc"
};

const btnStyle = {
  padding: "8px 15px",
  backgroundColor: "#4e73df",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

  return (
  <div style={{ padding: "40px" }}>
    <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
      Add Course
    </h2>

    <div style={{
      maxWidth: "900px",
      margin: "auto",
      background: "#f5e6cc",
      padding: "30px",
      borderRadius: "10px"
    }}>

      {/* Row 1 */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <input
          placeholder="Course Title"
          style={inputStyle}
          onChange={(e)=>setCourse({...course,title:e.target.value})}
        />

        <input
          placeholder="Category"
          style={inputStyle}
          onChange={(e)=>setCourse({...course,category:e.target.value})}
        />
      </div>

      {/* Row 2 */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <input
          placeholder="Price"
          style={inputStyle}
          onChange={(e)=>setCourse({...course,price:e.target.value})}
        />

        <textarea
          placeholder="Course Description"
          style={{ ...inputStyle, height: "80px" }}
          onChange={(e)=>setCourse({...course,description:e.target.value})}
        />
      </div>

     {/* Add Section Block */}
<div
  style={{
    marginTop: "30px",
    padding: "25px",
    background: "#f4f4f4",
    borderRadius: "10px",
  }}
>
  <h3 style={{ marginBottom: "20px" }}>Add Section</h3>

  <div
    style={{
      display: "flex",
      gap: "20px",
      alignItems: "flex-start",
      flexWrap: "wrap"
    }}
  >
    <input
      placeholder="Section Title"
      value={section.title}
      style={{
        flex: "1",
        padding: "10px",
        borderRadius: "6px",
        border: "1px solid #ccc",
      }}
      onChange={(e) =>
        setSection({ ...section, title: e.target.value })
      }
    />

    <textarea
      placeholder="Section Description"
      value={section.content}
      style={{
        flex: "1",
        padding: "10px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        height: "60px",
      }}
      onChange={(e) =>
        setSection({ ...section, content: e.target.value })
      }
    />

    <input
      type="file"
      accept="video/*,image/*"
      style={{
        padding: "8px",
      }}
      onChange={(e) =>
        setSection({ ...section, file: e.target.files[0] })
      }
    />

    <button
      onClick={addSection}
      style={{
        padding: "10px 18px",
        backgroundColor: "#4e73df",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      Add Section
    </button>
  </div>
</div>

      <button
        onClick={submitCourse}
        style={{ ...btnStyle, marginTop: "20px", width: "100%" }}
      >
        Submit Course
      </button>
    </div>
  </div>
);
}

export default AddCourse;
