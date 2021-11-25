import mongoose from "mongoose";

const notificationSchema = mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    read: {
      type: Boolean,
      required: true,
      default: false,
    },
    createdAt: Date,
    changeAt: Date,
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
