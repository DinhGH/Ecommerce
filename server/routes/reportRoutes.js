const express = require("express");
const reportController = require("../controllers/reportController");
const upload = require("../middlewares/upload");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

// GET users?page=1&limit=10
// router.get("/", userController.getAllUsers);

// POST new user (multipart/form-data)
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  reportController.reportIssue
);

// // // PUT update user
// router.put("/:id", upload.single("avatar"), userController.updateUserById);

// // // DELETE
// router.delete("/:id", userController.deleteUserById);

module.exports = router;
