import { useEffect, useState } from "react";
import API from "./AxiosInstance";

function AllCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await API.get("/user/getallcourses");

       
        setCourses(res.data.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <h2>All Courses</h2>

      {courses.length > 0 ? (
        courses.map((course) => (
          <div key={course._id}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p>Price: ₹{course.price}</p>
          </div>
        ))
      ) : (
        <p>No courses available</p>
      )}
    </div>
  );
}

export default AllCourses;
