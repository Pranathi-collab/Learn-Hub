const Course = require("../schemas/courseModel");

exports.addCourse = async (req, res) => {
  const course = await Course.create({
    ...req.body,
    userID: req.user.id
  });

  res.json(course);
};

exports.deleteCourse = async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.json({ message: "Course deleted" });
};
