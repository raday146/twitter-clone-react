import express from "express";
import path from "path";
import colors from "colors";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoSanitize from "express-mongo-sanitize";
import userRouters from "./routers/userRouters.js";
dotenv.config({ path: "./config.env" });
import connectDB from "./config/db.js";

connectDB();
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// data sanitization against NoSql query injection
app.use(mongoSanitize());
app.use(express.json({ limit: "10kb" }));

app.use("/api/users", userRouters);

app.get("/", (req, res) => {
  res.send("api is running");
});

const port = process.env.PORT || 5000;
app.listen(
  port,
  console.log(
    `server running in ${process.env.NODE_ENV} made on port ${port}`.yellow.bold
  )
);
