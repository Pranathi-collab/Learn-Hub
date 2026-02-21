const userSchema = require("../schemas/userModel");
const courseSchema = require("../schemas/courseModel");
const enrolledCourseSchema = require("../schemas/enrolledCourseModel");
const coursePaymentSchema = require("../schemas/coursePaymentModel");


/* 
   GET ALL USERS
*/
const getAllUsersController = async (req, res) => {
  try {
    const allUsers = await userSchema.find();

    if (!allUsers || allUsers.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No users found",
      });
    }

    return res.status(200).send({
      success: true,
      count: allUsers.length,
      data: allUsers,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};


/* 
   GET ALL COURSES
 */
const getAllCoursesController = async (req, res) => {
  try {
    const allCourses = await courseSchema.find();

    if (!allCourses || allCourses.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No courses found",
      });
    }

    return res.status(200).send({
      success: true,
      count: allCourses.length,
      data: allCourses,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};


/* 
   DELETE COURSE
*/
const deleteCourseController = async (req, res) => {
  try {
    const { courseid } = req.params;

    const course = await courseSchema.findByIdAndDelete(courseid);

    if (!course) {
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
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};


/*
   DELETE USER
 */
const deleteUserController = async (req, res) => {
  try {
    const { userid } = req.params;

    const user = await userSchema.findByIdAndDelete(userid);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "User deleted successfully",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};


/* 
   GET ALL ENROLLED COURSES
*/
const getAllEnrollmentsController = async (req, res) => {
  try {
    const enrollments = await enrolledCourseSchema
      .find()
      .populate("userId")
      .populate("courseId");

    if (!enrollments || enrollments.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No enrollments found",
      });
    }

    return res.status(200).send({
      success: true,
      count: enrollments.length,
      data: enrollments,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};


/*
   GET ALL PAYMENTS
 */
const getAllPaymentsController = async (req, res) => {
  try {
    const payments = await coursePaymentSchema
      .find()
      .populate("userId")
      .populate("courseId");

    if (!payments || payments.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No payments found",
      });
    }

    return res.status(200).send({
      success: true,
      count: payments.length,
      data: payments,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  getAllUsersController,
  getAllCoursesController,
  deleteCourseController,
  deleteUserController,
  getAllEnrollmentsController,
  getAllPaymentsController,
};
