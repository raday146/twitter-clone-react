import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import ApiFeaturs from "../utils/ApiFeaturs.js";

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
        await User.updateOne(
          { _id: userId },
          {
            $inc: { numFollowers: -1, numNotifications: 1 },
            $pull: {
              followers: user._id,
              notifications: {
                $each: [
                  {
                    title: "Unfollowed",
                    status: "You were unfollowed",
                    user: user._id,
                  },
                ],
              },
            },
          }
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
        await User.updateOne(
          { _id: userId },
          {
            $inc: { numFollowers: 1, numNotifications: 1 },
            $push: {
              followers: user._id,
              notifications: {
                $each: [
                  {
                    title: "Followed",
                    status: "You were followed",
                    user: user._id,
                  },
                ],
              },
            },
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

const searchUsers = () =>
  asyncHandler(async (req, res) => {
    try {
      console.log(req.query);
      const result = await User.find({
        $text: { $search: req.query.keyword },
      });
      res.status(200).json({ users: result });
    } catch (error) {
      res.status(400).json({
        message: "No results",
        stack: error.stack,
      });
    }
  });

const getFollowers = () =>
  asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select("-password");
      const followers = user.followers.map((userId) => userId);
      if (followers && followers.length > 0) {
        const users = await User.find(...followers);
        res.status(200).json(users);
      }
    } catch (error) {
      res.status(400).json({
        message: error.message,
        stack: error.stack,
      });
    }
  });

const getFriends = () =>
  asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select("-password");
      const following = user.following.map((userId) => userId);
      if (following && following.length > 0) {
        const users = await User.find(...following);
        res.status(200).json(users);
      }
    } catch (error) {
      res.status(400).json({
        message: error.message,
        stack: error.stack,
      });
    }
  });

const getNotifications = () =>
  asyncHandler(async (req, res) => {
    try {
      console.log("get");

      const user = await User.findById(req.user._id)
        .populate("notifications.user", "name , avatar")
        .populate("notifications.post")
        .select("-password");
      const notifications = user.notifications.map((n) => n);
      res.status(200).json(notifications);
    } catch (error) {
      res.status(400).json({
        message: error.message,
        stack: error.stack,
      });
    }
  });

const readNotification = () =>
  asyncHandler(async (req, res) => {
    try {
      const { _id } = req.body;
      console.log(_id);
      await User.updateMany(
        { _id: req.user._id },
        {
          $set: { "notifications.$[elem].read": true },
          $inc: { numNotifications: -1 },
        },
        { arrayFilters: [{ "elem._id": { $eq: _id } }], upsert: true }
      );

      res.status(200).json({
        message: "notification readed",
      });
    } catch (error) {
      console.log(error.stack);
      res.status(400).json({
        message: error.message,
        stack: error.stack,
      });
    }
  });

export {
  myProfile,
  updateProfile,
  getUser,
  getUsers,
  followHandler,
  searchUsers,
  getFollowers,
  getFriends,
  getNotifications,
  readNotification,
};
