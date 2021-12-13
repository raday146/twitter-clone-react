import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

const filterObj = (obj, ...alloawedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (el === "urls" && obj[el].includes(",")) {
      newObj[el] = obj[el].split(",");
      console.log("Array: ", newObj[el]);
    } else if (alloawedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

const myProfile = () =>
  asyncHandler(async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id);

      if (user) {
        res.status(201).json({
          id: user._id,
          name: user.name,
          email: user.email,
          bio: user.bio,
          avatar: user.avatar,
          location: user.location,
          banner: user.profileBanner,
          urls: user.urls,
        });
        console.log("end");
      } else {
        res.status(404).json({
          message: "User not found",
        });
      }
    } catch (error) {
      res.status(404).json({
        message: error + "no",
      });
    }
    // console.log(req.locals);
  });

/**
 *
 * @description Update user profile
 * @route PUT /api/users/profile
 * @access Private
 */
const updateProfile = () =>
  asyncHandler(async (req, res, next) => {
    try {
      if (req.body.password || req.body.passwordConfirm) {
        return next(
          new AppError("This route is not for password update.", 400)
        );
      }
      const defaultAvatar = !req.body.avatar;
      //2) filterd out unwanted fields names that are not allowed to update
      const filterBody = filterObj(
        req.body,
        "name",
        "email",
        "bio",
        "avatar",
        "location",
        "banner",
        "urls"
      );
      //3) update user document
      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        filterBody,
        defaultAvatar,
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(200).json({
        user: updatedUser,
      });
    } catch (error) {
      res.status(404).json({
        message: "Sorry, user not found!",
        stack: error,
      });
    }
    // console.log(req.locals);
  });

const getUser = () =>
  asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select("-password"); //.populate("user", "name avatar");;
      if (user) {
        res.status(201).json(user);
        console.log("end");
      } else {
        res.status(404).json({
          message: "User not found",
        });
      }
    } catch (error) {
      res.status(404).json({
        message: error + "no",
      });
    }
    // console.log(req.locals);
  });

const getUsers = () =>
  asyncHandler(async (req, res) => {
    try {
      const users = await User.find({}).select("-password"); //.populate("user", "name avatar");;
      if (users) {
        res.status(201).json(users);
      } else {
        res.status(404).json({
          message: "Not found any users",
        });
      }
    } catch (error) {
      res.status(404).json({
        message: error + "no",
      });
    }
    // console.log(req.locals);
  });
const followHandler = () =>
  asyncHandler(async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findById(req.user._id);

      if (userId && user.following.includes(userId)) {
        await User.updateOne(
          { _id: user._id },
          { $inc: { numFollowing: -1 }, $pull: { following: userId } }
        );
        res.status(200).json("You remove the follow!");
      } else {
        await User.updateOne(
          { _id: user._id },
          {
            $inc: { numFollowing: 1 },
            $push: { following: userId },
          }
        );
        res.status(200).json("You start to follow!");
      }
    } catch (error) {
      res.status(400).json({
        message: "User not found",
        stack: error.stack,
      });
    }
  });
export { myProfile, updateProfile, getUser, getUsers, followHandler };
