const User = require("../models/user.models.js");
const { validateToken } = require("../services/auth.services.js");
const { uploadOnCloudinary } = require("../services/cloudinary.services.js");

async function userSignup(req, res) {
  const { fullName, email, phone, role, hostel, room, rollNo, pass } = req.body;

  const errors = [];

  if (pass.length < 8) {
    errors.push("Password must be at least 8 characters long.");
  }
  if (!/[a-z]/.test(pass)) {
    errors.push("Password must contain at least one lowercase letter.");
  }
  if (!/[A-Z]/.test(pass)) {
    errors.push("Password must contain at least one uppercase letter.");
  }
  if (!/\d/.test(pass)) {
    errors.push("Password must contain at least one number.");
  }
  if (!/[@$!%*?&]/.test(pass)) {
    errors.push("Password must contain at least one special character.");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      message: "Password validation failed",
      errors: errors,
    });
  }

  const user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({ message: "User Already Exists" });
  }

  await User.create({
    fullName,
    email,
    phone,
    role,
    hostel,
    room,
    rollNo,
    pass,
  });

  return res.status(201).json({ message: "Account Created Successfully" });
}

async function userLogin(req, res) {
  const { email, pass } = req.body;
  try {
    const token = await User.matchPassword(email, pass);
    const user = validateToken(token);
    return res
      .status(200)
      .json({ message: "User Logged In Successfully", token, user });
  } catch (error) {
    console.log("Error ", error);
    return res.status(400).json({ message: "Invalid Email Or Password" });
  }
}

async function getUser(req, res) {
  try {
    const user = await User.findOne({ _id: req.user.id }).select("-pass -salt");
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json({ message: "User Not Found" });
  }
}

async function userUpdate(req, res) {
  try {
    const userId = req.user.id;
    const updates = req.body;
    await User.findByIdAndUpdate(userId, updates, { new: true });
    return res.status(200).json({ message: "User Updated Successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating user" });
  }
}

async function profileImageHandler(req, res) {
  try {
    const file = req.file;
    const userId = req.user.id;

    const result = await uploadOnCloudinary(file.buffer);

    await User.findByIdAndUpdate(userId, {
      profileImageURL: result.secure_url,
    });

    return res.status(200).json({
      message: "Profile Picture Updated Successfully",
    });
  } catch (error) {
    console.error("Error uploading profile picture: ", error);
    res.status(500).json({ message: "Error Uploading Profile Picture" });
  }
}

async function changePasswordHandler(req, res) {
  try {
    const { currPass, newPass } = req.body;
    const email = req.user.email;
    await User.matchPassword(email, currPass);
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User  not found" });
    }
    user.pass = newPass;
    await user.save();
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
}

module.exports = {
  userSignup,
  userLogin,
  getUser,
  userUpdate,
  profileImageHandler,
  changePasswordHandler,
};
