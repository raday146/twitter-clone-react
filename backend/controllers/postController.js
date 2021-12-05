import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import asyncHandler from "express-async-handler";

const getAllPosts = () =>
  asyncHandler(async (req, res, next) => {
    try {
      const posts = await Post.find({});
      console.log("get all the posts function ! ");
      res.status(200).json(posts);
    } catch (error) {
      res.status(400).json({
        message: "No posts found!",
        stack: error,
      });
    }
  });
const getPostById = () =>
  asyncHandler(async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.id).populate(
        "user",
        "name avatar"
      );
      console.log("get post by id function ! ");
      res.status(200).json(post);
    } catch (error) {
      res.status(400).json({
        message: "No post found!",
        stack: error,
      });
    }
  });
const createPost = () =>
  asyncHandler(async (req, res) => {
    try {
      const newPost = await Post.create({
        text: req.body.text,
        user: req.user._id,
      });

      res.status(200).json(newPost);
    } catch (error) {
      res.status(400).json({
        message:
          "An issue ware accure in creating the post, please try in another time.",
        stack: error.message,
      });
    }
  });
const editPost = () => asyncHandler(async (req, res, next) => {});
const deletePostById = () => asyncHandler(async (req, res, next) => {});

export { getAllPosts, getPostById, createPost, editPost, deletePostById };
