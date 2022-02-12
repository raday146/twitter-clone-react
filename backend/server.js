import express from "express";
import path from "path";
import colors from "colors";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoSanitize from "express-mongo-sanitize";
import userRouter from "./routers/userRouter.js";
import postRouter from "./routers/postRouter.js";
import trendRouter from "./routers/trendRouter.js";
import connectDB from "./config/db.js";

dotenv.config({ path: "./config.env" });

// connect to the mongoDB data

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// data sanitization against NoSql query injection
app.use(mongoSanitize());
app.use(express.json({ limit: "10kb" }));

// routing source
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/trends", trendRouter);

const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(cors({ credentials: true }));
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.use((req, res, next) => {
    console.log("HELLO", req.originalUrl);
    next();
  });
}

const port = process.env.PORT || 3001;
app.listen(
  port,
  console.log(
    `server running in ${process.env.NODE_ENV} made on port ${port}`.yellow.bold
  )
);
