import express from "express";
import {
  getTrends,
  aliasTrendToFilter,
  serachTrends,
} from "../controllers/trendController.js";

const router = express.Router();

router.get("/", aliasTrendToFilter, getTrends());
router.get("/search-result", serachTrends());

export default router;
