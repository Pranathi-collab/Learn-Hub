const courseSchema = require("../schemas/courseModel");
const userSchema = require("../schemas/userModel"); 

const postCourseController = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const {
      userId,
      C_educator,
      C_title,
      C_categories,
      C_price,
      C_description,
    } = req.body;

    let parsedSections = [];

    if (req.body.sections) {
      parsedSections = JSON.parse(req.body.sections);
    }

    if (req.file && parsedSections.length > 0) {
      parsedSections[0].video = `/uploads/${req.file.filename}`;
    }

    const course = new courseSchema({
      userId,
      C_educator,
      C_title,
      C_categories,
      C_price,
      C_description,
      sections: parsedSections,
    });

    await course.save();

    res.status(201).json({
      success: true,
      message: "Course Created Successfully",
    });
  } catch (error) {
    console.log("REAL ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// GET ALL COURSES
const getAllCoursesController = async (req, res) => {
  try {
    const courses = await courseSchema.find();
    return res.status(200).send({
      success: true,
      data: courses,
    });
  } catch (error) {
  console.log("COURSE ERROR:", error);
  return res.status(500).send({
    success: false,
    message: error.message,
  });
}
};
const enrollCourseController = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const course = await courseSchema.findById(id);
    if (!course) {
      return res.status(404).send({ message: "Course not found" });
    }

    // prevent duplicate enroll
    if (course.enrolledStudents.includes(userId)) {
      return res.status(400).send({ message: "Already enrolled" });
    }

    course.enrolledStudents.push(userId);
    course.enrolled += 1;

    await course.save();

    return res.status(200).send({
      success: true,
      message: "Enrolled successfully"
    });

  } catch (error) {
    console.log("ENROLL ERROR:", error);
    return res.status(500).send({
      success: false,
      message: error.message
    });
  }
};

const PDFDocument = require("pdfkit");

const getCertificateController = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;

    const course = await courseSchema.findById(id);
    if (!course) {
      return res.status(404).send({ message: "Course not found" });
    }

    const user = await userSchema.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const progress = Number(course.progress?.[userId] || 0);

    if (progress < 100) {
      return res.status(400).send({
        message: "Complete course first"
      });
    }

    const doc = new PDFDocument({
      layout: "landscape",
      size: "A4"
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${course.C_title}_certificate.pdf`
    );

    doc.pipe(res);

    doc.fontSize(30).text("Certificate of Completion", {
      align: "center"
    });

    doc.moveDown(2);

    doc.fontSize(18).text("This is to certify that", {
      align: "center"
    });

    doc.moveDown();

    //  USE ACTUAL USER NAME HERE
    doc.fontSize(26).text(user.name, {
      align: "center"
    });

    doc.moveDown();

    doc.fontSize(18).text("has successfully completed the course", {
      align: "center"
    });

    doc.moveDown();

    doc.fontSize(22).text(course.C_title, {
      align: "center"
    });

    doc.moveDown(2);

    doc.fontSize(16).text(
      `Date: ${new Date().toLocaleDateString()}`,
      { align: "center" }
    );

    doc.end();

  } catch (error) {
    console.log("CERTIFICATE ERROR:", error);
    res.status(500).send({ message: error.message });
  }
};
  
const updateProgressController = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, progress } = req.body;

    const course = await courseSchema.findById(id);
    if (!course) {
      return res.status(404).send({ message: "Course not found" });
    }

    // ensure object exists
    if (!course.progress) {
      course.progress = {};
    }

    // update user progress
    course.progress[userId] = Number(progress);

  
    course.markModified("progress");

    await course.save();

    res.status(200).send({
      success: true,
      message: "Progress updated successfully",
      currentProgress: course.progress[userId]
    });

  } catch (error) {
    console.log("PROGRESS ERROR:", error);
    res.status(500).send({ message: error.message });
  }
};
module.exports = {
  postCourseController,
  getAllCoursesController,
  enrollCourseController,
  getCertificateController,
  updateProgressController,
};
