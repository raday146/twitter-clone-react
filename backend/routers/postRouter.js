import express from "express";
const router = express.Router();
import { protect } from "../controllers/authController.js";
import {
  createPost,
  getAllPosts,
  getPostById,
  getPostLikesByUser,
  setLikes,
} from "../controllers/postController.js";

router.get("/", getAllPosts());
router.get("/:id", getPostById());
router.route("/:id/like").get(getPostLikesByUser()).post(protect, setLikes());

router.use(protect);
router.post("/", createPost());
export default router;
