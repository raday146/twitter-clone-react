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
    mainPostStringId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    userRepostList: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    ],
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
    isReplay: { type: Boolean, required: true, default: false },
    privateTweet: {
      type: Boolean,
      required: true,
      default: false,
    },
    rTweeted: {
      type: Boolean,
      required: true,
      default: false,
    },
    tweetCount: { type: Number, required: true, default: 0 },
    hashtags: {
      type: String,
    },
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
/**
  * const rePostSchema = mongoose.Schema(
  {
    rtBy: { type: String, required: true },
    reText: {
      type: String,
      required: true,
    },
    comments: [commentSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    numComment: {
      type: Number,
      required: true,
      default: 0,
    },
    media: [mediaSchema],

    likes: [likesSchema],
    numLikes: {
      type: Number,
      required: true,
      default: 0,
    },
    rTweeted: {
      type: Boolean,
      required: true,
      default: false,
    },
    isQouted: { type: Boolean, required: true, default: false },
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
    privateTweet: {
      type: Boolean,
      required: true,
      default: false,
    },
    rePosts: [rePostSchema],
    rTweeted: {
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
  */
