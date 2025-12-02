const express = require("express");
const router = express.Router();
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getSingleUser,
} = require("../controllers/usercontroller");
const upload = require("../middleware/upload");

router.get("/", getUsers);
router.post("/", upload.single("avatar"), createUser);
router.get("/", getSingleUser);
router.put("/:id", upload.single("avatar"), updateUser);
router.delete("/:id", deleteUser);
module.exports = router;
