import mongoose from "mongoose";

const trendSchema = mongoose.Schema(
  {
    trend: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    postId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    tweetVolume: {
      type: Number,
      require: true,
      default: 0,
    },
    createdAt: Date,
    changeAt: Date,
  },

  {
    timestamps: true,
  }
);

trendSchema.methods.checkHashtags = async function (checkString) {
  return checkString.match(/\B(\#[a-zA-Z-1-9]+\b)(?!;)/g);
};
const Trend = mongoose.model("Trend", trendSchema);
export default Trend;
