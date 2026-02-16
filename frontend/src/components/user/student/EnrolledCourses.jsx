export default function EnrolledCourses() {
  return (
    <div className="container mt-5">
      <h2>Enrolled Courses</h2>

      <div className="card p-3 mt-4" style={{ width: "300px" }}>
        <h4 className="text-danger">Frontend Course</h4>
        <p>Sections: 5</p>
        <p>Price: Free</p>
        <button className="btn btn-primary">Start Course</button>
      </div>
    </div>
  );
}
