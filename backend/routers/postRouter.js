import express from "express";
const router = express.Router();
import { protect } from "../controllers/authController.js";
import {
  createPost,
  getAllPosts,
  getPostById,
  getPostLikesByUser,
  setLikes,
  getRepostsByUser,
  aliasPostToFilter,
  setRepost,
} from "../controllers/postController.js";

router.get("/", aliasPostToFilter, getAllPosts());
router.get("/:id/all", aliasPostToFilter, getAllPosts());
router.get("/:id", getPostById());
router.route("/:id/like").get(getPostLikesByUser()).post(protect, setLikes());
router.route("/:id/reposts").get(getRepostsByUser()).post(protect, setRepost());
router.use(protect);
router.post("/", createPost());

export default router;
