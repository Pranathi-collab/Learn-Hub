import StudentHome from "../user/student/StudentHome";
import TeacherHome from "../user/teacher/TeacherHome";
import AdminHome from "../admin/AdminHome";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user) return <h2>Please login</h2>;

  if (user.type === "student") return <StudentHome />;
  if (user.type === "teacher") return <TeacherHome />;
  if (user.type === "admin") return <AdminHome />;

  return <h2>Invalid Role</h2>;
}

export default Dashboard;
