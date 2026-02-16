const router = require("express").Router();
const {
  addCourse,
  deleteCourse
} = require("../controllers/adminController");

const { verifyToken, roleCheck } = require("../middlewares/authMiddleware");

router.post("/add-course", verifyToken, roleCheck("teacher"), addCourse);
router.delete("/delete-course/:id", verifyToken, deleteCourse);

module.exports = router;
