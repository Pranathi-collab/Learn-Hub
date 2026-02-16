export default function AllCourses() {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Trending Courses</h2>

      <div className="d-flex justify-content-center mb-4">
        <input className="form-control w-25 me-2" placeholder="Search by title" />
        <select className="form-select w-25">
          <option>All Courses</option>
        </select>
      </div>

      <div className="card p-3" style={{ width: "300px" }}>
        <h4>Modules</h4>
        <p><b>Title:</b> Introduction</p>
        <p><b>Description:</b> Course intro</p>
        <hr />
        <p>Many more to watch...</p>
      </div>
    </div>
  );
}
