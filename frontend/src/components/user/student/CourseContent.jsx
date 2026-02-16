export default function CourseContent() {
  return (
    <div className="container mt-5">
      <h2>Welcome to the course: Frontend Course</h2>

      <div className="row mt-4">
        <div className="col-md-6">
          <div className="accordion">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button">
                  Module 1
                </button>
              </h2>
              <div className="accordion-body">
                PLAY VIDEO
              </div>
            </div>
          </div>

          <a href="#" className="mt-3 d-block">
            DOWNLOAD CERTIFICATE
          </a>
        </div>

        <div className="col-md-6">
          <video width="100%" controls>
            <source src="sample.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
}
