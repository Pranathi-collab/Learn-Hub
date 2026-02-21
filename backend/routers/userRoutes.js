const express = require("express");
const multer = require("multer");
const path = require("path");

const authMiddleware = require("../middlewares/authMiddleware");

const {
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
} = require("../controllers/userController");

const router = express.Router();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 500 * 1024 * 1024, 
  },
  fileFilter: function (req, file, callback) {
    const ext = path.extname(file.originalname);
    if (ext !== ".mp4") {
      return callback(
        new Error("Only .mp4 videos are allowed")
      );
    }
    callback(null, true);
  },
});


router.post("/register", registerController);
router.post("/login", loginController);


// Add Course (Teacher)
router.post(
  "/addcourse",
  authMiddleware,
  upload.array("S_content"),   // multiple videos
  postCourseController
);

// Get all courses 
router.get("/getallcourses", getAllCoursesController);

// Get teacher courses
router.get(
  "/getallcoursesteacher",
  authMiddleware,
  getAllCoursesuserController
);

// Delete course
router.delete(
  "/deletecourse/:courseid",
  authMiddleware,
  deleteCourseController
);


// Enroll course
router.post(
  "/enrolledcourse/:courseid",
  authMiddleware,
  enrolledCourseController
);

// Get course content (Student)
router.get(
  "/coursecontent/:courseid", 
  authMiddleware,
  sendCourseContentController
);

// Mark module complete
router.post(
  "/completemodule",
  authMiddleware,
  completeSectionController
);

// Get all enrolled courses of user
router.get(
  "/getallcoursesuser",
  authMiddleware,
  sendAllCoursesUserController
);


module.exports = router;
