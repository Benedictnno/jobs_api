const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user, token });
};

const Login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide an email and a Password");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("invalid Email");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("invalid Password");
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user, token });
};

module.exports = { register, Login };
