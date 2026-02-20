const express = require("express");
const router = express.Router();

// 🔥 IMPORT CONTROLLERS FIRST
const {
  postCourseController,
  getAllCoursesController,
  enrollCourseController,
  getCertificateController,
  updateProgressController,
  
} = require("../controllers/courseController");

// 🔥 IMPORT MULTER
const upload = require("../middlewares/uploadMiddleware");

// ROUTES
router.post(
  "/add-course",
  upload.single("video"),
  postCourseController
);

router.get("/get-courses", getAllCoursesController);

router.post("/enroll/:id", enrollCourseController);
console.log("Course routes loaded");

router.get("/certificate/:id", getCertificateController);

router.post("/progress/:id", updateProgressController);

module.exports = router;