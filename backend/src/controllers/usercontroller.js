const mongoose = require("mongoose");
const User = require("../models/user");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getSingleUser = async (req, res) => {
  try {
    const { id } = req.body;
    
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "کاربر یافت نشد" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "مقادیر username یا email یا password فرستاده نشده" });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    res
      .status(201)
      .json({ message: "User created Successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID نامعتبر است" });
    }

    const updates = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "کاربر یافت نشد" });
    }

    res.json({ message: "کاربر به‌روزرسانی شد", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID نامعتبر است" });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "کاربر یافت نشد" });
    }

    res.json({ message: "کاربر حذف شد", user: deletedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
