const User = require("../schemas/userModel");
const Course = require("../schemas/courseModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password, type } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hashed, type });
  res.json(user);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: "Wrong password" });

  const token = jwt.sign(
    { id: user._id, type: user.type },
    process.env.JWT_SECRET
  );

  res.json({ token, user });
};

exports.getCourses = async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
};

exports.enrollCourse = async (req, res) => {
  const course = await Course.findById(req.params.id);
  course.enrolled += 1;
  await course.save();
  res.json({ message: "Enrolled successfully" });
};
