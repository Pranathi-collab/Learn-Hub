import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/common/NavBar";

import Home from "./components/common/Home";
import Login from "./components/common/Login";
import Register from "./components/common/Register";
import Dashboard from "./components/common/Dashboard";

import StudentHome from "./components/user/student/StudentHome";
import TeacherHome from "./components/user/teacher/TeacherHome";
import AdminHome from "./components/admin/AdminHome";

import AddCourse from "./components/user/teacher/AddCourse";
import EnrolledCourses from "./components/user/student/EnrolledCourses";
import AllCourses from "./components/common/AllCourses";

function App() {
  return (
    <BrowserRouter>

      {/* 🔹 Navbar appears on all pages */}
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/student" element={<StudentHome />} />
        <Route path="/teacher" element={<TeacherHome />} />
        <Route path="/admin" element={<AdminHome />} />

        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/enrolled" element={<EnrolledCourses />} />
        <Route path="/courses" element={<AllCourses />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
