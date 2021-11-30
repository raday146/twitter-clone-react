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

export { myProfile, updateProfile };
