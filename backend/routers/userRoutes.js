const router = require("express").Router();
const {
  register,
  login,
  getCourses,
  enrollCourse
} = require("../controllers/userControllers");

const { verifyToken } = require("../middlewares/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/courses", getCourses);
router.post("/enroll/:id", verifyToken, enrollCourse);

module.exports = router;
