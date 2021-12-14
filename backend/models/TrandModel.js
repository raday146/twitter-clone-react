import mongoose from "mongoose";

const trandSchema = mongoose.Schema(
  {
    trand: {
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
  },
  {
    timestamps: true,
  }
);
const Trand = mongoose.model("Tost", trandSchema);
export default Trand;
