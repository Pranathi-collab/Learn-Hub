const userSchema = require("../schemas/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { name, email, password, type } = req.body;

    if (!name || !email || !password || !type) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userSchema({
      name,
      email,
      password: hashedPassword,
      type
    });

    await user.save();

    res.status(201).send({
      success: true,
      message: "User Registered Successfully"
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Register Error" });
  }
};


const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid Password" });
    }

    const token = jwt.sign(
      { id: user._id },
      "secretkey",
      { expiresIn: "1d" }
    );

    res.status(200).send({
      success: true,
      token,
      user
    });

  } catch (error) {
    res.status(500).send({ message: "Login Error" });
  }
  console.log(req.body);
};
module.exports = { registerController, loginController };
