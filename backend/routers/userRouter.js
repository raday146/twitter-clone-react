import express from "express";
//import userController from "../controllers/userController.js";
import {
  login,
  signup,
  logout,
  protect,
} from "../controllers/authController.js";
import {
  myProfile,
  updateProfile,
  getUser,
  getUsers,
  followHandler,
  searchUsers,
  getFollowers,
  getFriends,
  getNotifications,
} from "../controllers/userController.js";

const router = express.Router();

/**
 * @description signup as user
 * @route POST/api/signup
 * @access Public
 */
router.post("/signup", signup());

/**
 * @description login user
 * @route POST/api/users/login
 * @access Public
 */

/**
 * @description logout user
 * @route GET/api/users/logout
 * @access Public
 */

router.post("/login", login()).post("/logout", logout);
router.get("/", getUsers());
router.get("/search-result", searchUsers());
router.get("/:id", getUser());
router.get("/:id/followers", getFollowers());
router.get("/:id/friends", getFriends());

router.use(protect);
router.post("/:id/follow", followHandler());
router.post("/notifications", getNotifications());
router.route("/profile").get(myProfile()).put(updateProfile());

/*
.patch(updatePassword());

router.use(restriction);
router.route("/:id").get(getUserById()).put(updateUser()).delete(deleteUser());

router.get("/", getUsers);
*/
export default router;
