import { useEffect, useState } from "react";
import API from "../common/AxiosInstance";

function AdminHome() {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    API.get("/admin/users").then(res => setUsers(res.data));
    API.get("/admin/courses").then(res => setCourses(res.data));
  }, []);

  const deleteUser = async (id) => {
    await API.delete(`/admin/user/${id}`);
    alert("User Deleted");
  };

  return (
    <div>
      <h2>Admin Panel</h2>

      <h3>Users</h3>
      {users.map(u=>(
        <div key={u._id}>
          {u.name} - {u.type}
          <button onClick={()=>deleteUser(u._id)}>
            Delete
          </button>
        </div>
      ))}

      <h3>Courses</h3>
      {courses.map(c=>(
        <div key={c._id}>
          {c.title}
        </div>
      ))}
    </div>
  );
}

export default AdminHome;
