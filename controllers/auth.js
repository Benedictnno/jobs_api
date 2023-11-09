const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  //   const salt = await bcrypt.genSalt(10);
  //   const hashedPassword = await bcrypt.hash(password, salt);
  //   const tempUser = { name, email, password: hashedPassword };

  const user = await User.create({ ...req.body });
  const token = jwt.sign({ userID: user._id, name: user.name }, "jwtSecret", {
    expiresIn: "30",
  });
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.getName() }, token });
};

const Login = async (req, res) => {
  res.send("Login");
};

module.exports = { register, Login };
