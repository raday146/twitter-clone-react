import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";

const followerSchema = mongoose.Schema({
  follow: {
    type: Boolean,
    required: true,
    default: false,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  ],
  numFollowers: {
    type: Number,
    required: true,
    default: 0,
  },
});

const friendsSchema = mongoose.Schema({
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  ],
  numFriends: {
    type: Number,
    required: true,
    default: 0,
  },
});
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
      required: true,
      unique: true,
    },
    defaultImage: {
      type: Boolean,
      required: true,
      default: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    location: {
      type: String,
      required: true,
      unique: true,
    },
    followerSchema: [followerSchema],
    friends: [friendsSchema],
    favoritesCount: {
      type: Number,
      required: true,
      default: 0,
    },
    createdAt: Date,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  // only run this func if password actually modified
  if (!this.isModified()) return next();

  // hash the password with cost 12
  this.password = await bcrypt.hash(this.password, 12);
  // delete the passwordConfirm

  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changeTimeStamp = parseInt(this.passwordChangedAt.getTime / 1000, 10);
    console.log("changed pass", this.passwordChangedAt);
    return JWTTimestamp < changeTimeStamp;
  }
  return false;
};
const User = mongoose.model("User", userSchema);
export default User;

/**
 *  publishedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Posts",
      },
    ],
 */
