const express = require("express");
const router = express.Router();
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getSingleUser,
} = require("../controllers/usercontroller");

router.get("/", getUsers);
router.post("/", createUser);
router.get("/", getSingleUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
module.exports = router;
