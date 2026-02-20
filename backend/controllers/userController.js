const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = require("../schemas/userModel");
const courseSchema = require("../schemas/courseModel");
const enrolledCourseSchema = require("../schemas/enrolledCourseModel");

////////////////////////////////////////////////////
// REGISTER
////////////////////////////////////////////////////
const registerController = async (req, res) => {
  try {
    const existsUser = await userSchema.findOne({ email: req.body.email });

    if (existsUser) {
      return res.status(400).send({
        success: false,
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new userSchema({
      ...req.body,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).send({
      success: true,
      message: "Registered successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

////////////////////////////////////////////////////
// LOGIN
////////////////////////////////////////////////////
const loginController = async (req, res) => {
  try {
    const user = await userSchema.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.type },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    user.password = undefined;

    return res.status(200).send({
      success: true,
      message: "Login successful",
      token,
      userData: user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

////////////////////////////////////////////////////
// GET ALL COURSES
////////////////////////////////////////////////////
const getAllCoursesController = async (req, res) => {
  try {
    const allCourses = await courseSchema.find();

    return res.status(200).send({
      success: true,
      data: allCourses,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

////////////////////////////////////////////////////
// CREATE COURSE (Teacher)
////////////////////////////////////////////////////
const postCourseController = async (req, res) => {
  try {
    const {
      userId,
      C_educator,
      C_title,
      C_categories,
      C_price,
      C_description,
      sections,
    } = req.body;

    const course = new courseSchema({
      userId,
      C_educator,
      C_title,
      C_categories,
      C_price: C_price == 0 ? "free" : C_price,
      C_description,
      sections,
    });

    await course.save();

    return res.status(201).send({
      success: true,
      message: "Course created successfully",
    });
  } catch (error) {
  console.log("COURSE ERROR:", error);
  return res.status(500).send({
    success: false,
    message: error.message,
  });
  }
};

////////////////////////////////////////////////////
// GET TEACHER COURSES
////////////////////////////////////////////////////
const getAllCoursesuserController = async (req, res) => {
  try {
    const allCourses = await courseSchema.find({
      userId: req.body.userId,
    });

    return res.status(200).send({
      success: true,
      data: allCourses,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

////////////////////////////////////////////////////
// DELETE COURSE
////////////////////////////////////////////////////
const deleteCourseController = async (req, res) => {
  try {
    const { courseid } = req.params;

    const deleted = await courseSchema.findByIdAndDelete(courseid);

    if (!deleted) {
      return res.status(404).send({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

////////////////////////////////////////////////////
// ENROLL COURSE
////////////////////////////////////////////////////
const enrolledCourseController = async (req, res) => {
  try {
    const { courseid } = req.params;
    const { userId } = req.body;

    const course = await courseSchema.findById(courseid);
    if (!course) {
      return res.status(404).send({
        success: false,
        message: "Course not found",
      });
    }

    const alreadyEnrolled = await enrolledCourseSchema.findOne({
      courseId: courseid,
      userId,
    });

    if (alreadyEnrolled) {
      return res.status(400).send({
        success: false,
        message: "Already enrolled",
      });
    }

    const enrollment = new enrolledCourseSchema({
      courseId: courseid,
      userId,
      course_Length: course.sections.length,
      completedSections: 0,
      progress: [],
      completed: false,
    });

    await enrollment.save();

    return res.status(201).send({
      success: true,
      message: "Enrolled successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

////////////////////////////////////////////////////
// SEND COURSE CONTENT
////////////////////////////////////////////////////
const sendCourseContentController = async (req, res) => {
  try {
    const { courseid } = req.params;
    const { userId } = req.body;

    const enrolledUser = await enrolledCourseSchema.findOne({
      userId,
      courseId: courseid,
    });

    if (!enrolledUser) {
      return res.status(404).send({
        success: false,
        message: "User not enrolled",
      });
    }

    const course = await courseSchema.findById(courseid);

    return res.status(200).send({
      success: true,
      courseContent: course.sections,
      completedModule: enrolledUser.progress,
      certificateData: enrolledUser,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

////////////////////////////////////////////////////
// COMPLETE SECTION
////////////////////////////////////////////////////
const completeSectionController = async (req, res) => {
  try {
    const { courseId, sectionId, userId } = req.body;

    const enrolledCourse = await enrolledCourseSchema.findOne({
      courseId,
      userId,
    });

    if (!enrolledCourse) {
      return res.status(404).send({
        success: false,
        message: "Not enrolled",
      });
    }

    enrolledCourse.progress.push({ sectionId });

    if (
      enrolledCourse.progress.length >=
      enrolledCourse.course_Length
    ) {
      enrolledCourse.completed = true;
    }

    await enrolledCourse.save();

    return res.status(200).send({
      success: true,
      message: "Section completed",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

////////////////////////////////////////////////////
// GET ALL COURSES FOR USER
////////////////////////////////////////////////////
const sendAllCoursesUserController = async (req, res) => {
  try {
    const { userId } = req.body;

    const enrolledCourses = await enrolledCourseSchema.find({
      userId,
    });

    const courseDetails = await Promise.all(
      enrolledCourses.map(async (item) => {
        return await courseSchema.findById(item.courseId);
      })
    );

    return res.status(200).send({
      success: true,
      data: courseDetails,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

////////////////////////////////////////////////////
module.exports = {
  registerController,
  loginController,
  getAllCoursesController,
  postCourseController,
  getAllCoursesuserController,
  deleteCourseController,
  enrolledCourseController,
  sendCourseContentController,
  completeSectionController,
  sendAllCoursesUserController,
};
