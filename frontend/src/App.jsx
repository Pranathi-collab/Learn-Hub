import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/common/NavBar";
import Footer from "./components/common/Footer";

import Home from "./components/common/Home";
import Login from "./components/common/Login";
import Register from "./components/common/Register";
import AllCourses from "./components/common/AllCourses";
import Dashboard from "./components/common/Dashboard";

import PaymentPage from "./components/payment/PaymentPage";
import CoursePlayer from "./components/course/CoursePlayer";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/get-courses" element={<AllCourses />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/payment/:id" element={<PaymentPage />} />
        <Route path="/course/:id" element={<CoursePlayer />} />
      </Routes>

      
      <Footer />

    </BrowserRouter>
  );
}

export default App;