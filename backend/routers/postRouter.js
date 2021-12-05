import express from "express";
const router = express.Router();
import { protect } from "../controllers/authController.js";
import { createPost, getAllPosts } from "../controllers/postController.js";

router.get("/", getAllPosts());
router.use(protect);
router.post("/", createPost());
export default router;
