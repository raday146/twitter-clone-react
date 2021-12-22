import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import Trend from "../models/TrendModel.js";
import asyncHandler from "express-async-handler";
import ApiFeaturs from "../utils/ApiFeaturs.js";

const aliasPostToFilter = (req, res, next) => {
  req.query.sort = "-createdAt";
  next();
};

const getAllPosts = () =>
  asyncHandler(async (req, res, next) => {
    try {
      const userId = req.params.id;
      const features = new ApiFeaturs(Post.find({}), req.query).sort();
      const posts = await features.query;
      if (userId) {
        const user = await User.findById(userId).populate("-password");
        const allowedPosts = posts.filter(
          (post) =>
            post.user.toString() === userId ||
            user.following.includes(post.user.toString())
        );
        console.log("get only the user posts and following user posts ! ");
        res.status(200).json(allowedPosts);
      } else {
        console.log("get all the posts function ! ");
        res.status(200).json(posts);
      }
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
      const hashtags = await Trend.schema.methods.checkHashtags(req.body.text);

      const newPost = await Post.create({
        author: req.user.name,
        text: req.body.text,
        user: req.user._id,
        hashtags: String(hashtags),
      });

      const id = newPost._id;
      if (hashtags.length > 0) {
        console.log("in if");
        const trend = await Trend.findOne({ trend: String(hashtags) });
        if (trend) {
          trend.postId.push(id);
          trend.tweetVolume = trend.postId.length;
          await trend.save();
        } else {
          console.log("in else");
          await Trend.create({
            trend: String(hashtags),
            name: String(hashtags).substring(1),
            postId: id,
            tweetVolume: 1,
          });
        }
      }
      res.status(200).json(newPost);
    } catch (error) {
      res.status(400).json({
        message:
          "An issue ware accure in creating the post, please try in another time.",
        stack: error.message,
      });
    }
  });
const setLikes = () =>
  asyncHandler(async (req, res, next) => {
    try {
      //const { like } = req.body;
      const post = await Post.findById(req.params.id);

      const alreadyliked = post.likes.find(
        (l) => l.user.toString() === req.user._id.toString()
      );
      if (alreadyliked) {
        post.likes
          .find((l) => l.user.toString() === req.user._id.toString())
          .remove();
        post.numLikes = post.likes.length;
        await post.save();
        res.status(200).json({
          message: "You remove like",
        });
      } else {
        const like = {
          islike: true,
          user: req.user._id,
        };
        post.likes.push(like);
        post.numLikes = post.likes.length;
        await post.save();

        await User.updateOne(
          { _id: post.user },
          {
            $inc: { numNotifications: 1 },
            $push: {
              notifications: {
                $each: [
                  {
                    title: "Liked",
                    status: "You were Liked",
                    user: req.user._id,
                    post: post._id,
                  },
                ],
              },
            },
          }
        );
        res.status(201).json({
          message: "like added",
        });
      }
    } catch (error) {
      res.status(400).json({
        message: "No post found",
        stack: error,
      });
    }
  });
const getPostLikesByUser = () =>
  asyncHandler(async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.id);
      const likes = post.likes.map((l) => l.user);
      if (likes.length === 0) {
        res.status(400).json({
          message: "The list is empty!",
        });
      } else {
        const users = await User.find(...likes);
        res.status(200).json(users);
      }
    } catch (error) {
      res.status(400).json({
        message: "No post found",
        stack: error,
      });
    }
  });

const getRepostsByUser = (req, res) =>
  asyncHandler(async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.id);

      if (post.tweetCount > 0) {
        const userList = post.userRepostList.map((r) => r);
        const users = await User.find({
          _id: {
            $in: userList.map((u) => u),
          },
        });
        res.status(200).json(users);
      } else {
        res.status(400).json({
          message: "The list is empty!",
        });
      }
    } catch (error) {
      res.status(400).json({
        message: "No post found",
        stack: error,
      });
    }
  });
const setRepost = () =>
  asyncHandler(async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.id);

      const alreadyReposted = post.userRepostList.find(
        (r) => r.toString() === req.user._id.toString()
      );
      if (!!alreadyReposted) {
        await Post.deleteOne({ mainPostStringId: req.params.id });
        post.userRepostList.remove(req.user._id.toString());
        post.tweetCount = post.userRepostList.length;
        await post.save();
        res.status(200).json({
          message: "You remove retweet",
        });
      } else {
        const retweet = await Post.create({
          text: post.text,
          author: req.user.name,
          user: req.user._id,
          mainPostStringId: post._id,
          rTweeted: true,
          userRepostList: [],
        });

        post.userRepostList.push(req.user._id);
        post.tweetCount = post.userRepostList.length;
        await post.save();
        res.status(200).json(retweet);
      }
    } catch (error) {
      res.status(400).json({
        message: "No post found",
        stack: error,
      });
    }
  });

const searchPosts = () =>
  asyncHandler(async (req, res) => {
    try {
      const result = await Post.find({ $text: { $search: req.query.keyword } });
      res.status(200).json({ posts: result });
    } catch (error) {
      res.status(400).json({
        message: "No results",
        stack: error.stack,
      });
    }
  });

const editPost = () => asyncHandler(async (req, res, next) => {});
const deletePostById = () => asyncHandler(async (req, res, next) => {});
export {
  getAllPosts,
  getPostById,
  createPost,
  editPost,
  deletePostById,
  setLikes,
  getPostLikesByUser,
  getRepostsByUser,
  aliasPostToFilter,
  setRepost,
  searchPosts,
};
