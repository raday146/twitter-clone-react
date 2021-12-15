import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import Trend from "../models/TrendModel.js";
import asyncHandler from "express-async-handler";
import ApiFeaturs from "../utils/ApiFeaturs.js";

const aliasTrendToFilter = (req, res, next) => {
  req.query.limit = "2";
  req.query.sort = "-createdAt,tweetVolume";
  next();
};

const getTrends = () =>
  asyncHandler(async (req, res, next) => {
    try {
      const features = new ApiFeaturs(Trend.find({}), req.query).sort();
      const trends = await features.query;

      console.log("get all the trends function ! ");
      if (trends && trends.length > 0) {
        res.status(200).json(trends);
      } else {
        res.status(200).json();
      }
    } catch (error) {
      res.status(400).json({
        message: "No trand found!",
        stack: error,
      });
    }
  });

export { getTrends, aliasTrendToFilter };
