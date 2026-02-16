export default function AddCourse() {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add Course</h2>

      <div className="card p-4">
        <div className="row">
          <div className="col-md-6 mb-3">
            <input className="form-control" placeholder="Course Title" />
          </div>

          <div className="col-md-6 mb-3">
            <input className="form-control" placeholder="Course Price (Rs.)" />
          </div>

          <div className="col-md-12 mb-3">
            <textarea className="form-control" placeholder="Course Description"></textarea>
          </div>
        </div>

        <button className="btn btn-success mt-3">Submit</button>
      </div>
    </div>
  );
}
