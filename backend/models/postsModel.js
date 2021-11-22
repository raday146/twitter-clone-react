import mongoose from "mongoose";

const likesSchema = mongoose.Schema(
  {
    islike: {
      type: Boolean,
      required: true,
      default: false,
    },
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    ],
    post: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Post",
    },
    createdAt: Date,
    changeAt: Date,
  },

  { timestamps: true },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const commentSchema = mongoose.Schema(
  {
    comment: { type: String, required: true },
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    ],
    likes: [likesSchema],
    numLikes: {
      type: Number,
      required: true,
      default: 0,
    },

    createdAt: Date,
    changeAt: Date,
  },

  { timestamps: true },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const postSchema = mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    comment: [commentSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    image: {
      type: String,
      required: true,
      unique: true,
    },
    numComment: {
      type: Number,
      required: true,
      default: 0,
    },
    likes: [likesSchema],
    numLikes: {
      type: Number,
      required: true,
      default: 0,
    },
    createdAt: Date,
    changeAt: Date,
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
