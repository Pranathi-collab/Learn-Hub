import { useEffect, useState } from "react";
import API from "../../common/AxiosInstance";
import AddCourse from "./AddCourse";

function TeacherHome() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await API.get("/get-courses");
        setCourses(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <AddCourse />
    </div>
  );
}

export default TeacherHome;