import mongoose from "mongoose";

const likesSchema = mongoose.Schema(
  {
    islike: {
      type: Boolean,
      required: true,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
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
const hashtagsSchema = mongoose.Schema(
  {
    isHashtag: {
      type: Boolean,
      required: true,
      default: false,
    },
    hashtag: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
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
const symbolsSchema = mongoose.Schema(
  {
    isSymbols: {
      type: Boolean,
      required: true,
      default: false,
    },
    symbols: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
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

const mediaSchema = mongoose.Schema(
  {
    isMedia: {
      type: Boolean,
      required: true,
      default: false,
    },
    mime: {
      type: String,
      required: true,
      default: "Unknown",
    },
    media: {
      type: String,
      required: true,
    },
    url: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    imag: {
      type: String,
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
    author: { type: String, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
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

  { timestamps: true },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const postSchema = mongoose.Schema(
  {
    author: { type: String, required: true },
    text: {
      type: String,
      required: true,
    },
    comments: [commentSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    media: [mediaSchema],
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
    isQouted: { type: Boolean, required: true, default: false },
    tweeted: {
      type: Boolean,
      required: true,
      default: false,
    },
    tweetCount: { type: Number, required: true, default: 0 },
    hashtags: [hashtagsSchema],
    symbols: [symbolsSchema],
    createdAt: Date,
    changeAt: Date,
  },

  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
