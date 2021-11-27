import promisify from "util-promisify";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "./../models/userModel.js";
import asyncHandler from "express-async-handler";

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV !== "production") {
    cookieOptions.secure = true;
  }
  res.cookie("jwt", token, cookieOptions);

  // this for removing password from the output
  user.password = undefined;

  res.status(statusCode).json({
    token,
    user,
  });
};

const signup = () =>
  asyncHandler(async (req, res, next) => {
    console.log("signup 1");
    try {
      const newUser = await User.create(req.body);
      createSendToken(newUser, 201, res);
    } catch (error) {
      res.status(400).json({
        message: "Fill all the fields to compleet the registration",
        stack: error.message,
      });
    }
    console.log("s");
  });

const login = () =>
  asyncHandler(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      console.log(email, password, "auth");

      // 1) checj if email and password exist
      if (!email || !password) {
        const er = new AppError("Please provide email and password!", 400);
        res.status(er.statusCode).json({ message: er.message });
      }

      // 2) check if user exists and password is correct

      const user = await User.findOne({ email }).select("+password");
      // 3) if everything ok, send token to client
      if (!user || !(await user.correctPassword(password, user.password))) {
        const er = new AppError("Incorrect email or password", 401);
        res.status(er.statusCode).json({ message: er.message });
      }
      createSendToken(user, 200, res);
    } catch (error) {
      res.status(401).json({
        message: "Incorrect email or password",
        stack: error.message,
      });
    }
  });

const logout = asyncHandler(async (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 + 1000),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });
  res.status(200).json({
    status: "logout successefuly!",
  });
});

export { signup, login, logout };
