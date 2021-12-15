import express from "express";
import {
  getTrends,
  aliasTrendToFilter,
} from "../controllers/trendController.js";

const router = express.Router();

router.get("/", aliasTrendToFilter, getTrends());

export default router;
