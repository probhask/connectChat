import express, { Request, Response } from "express";

import authRoute from "./routes/authRoute";
import chatListRoute from "./routes/chatListRoute";
import connectDB from "./config/db";
import conversationRoute from "./routes/conversationRoute";
import cookieParser from "cookie-parser";
import cors from "cors";
import cron from "node-cron";
import dotenv from "dotenv";
import { downLoadFile } from "./utils/downloadFile";
import friendRequestRoute from "./routes/friendRequestRoute";
import http from "http";
import messageRoute from "./routes/messageRoute";
import path from "path";
import { runServerOnCrash } from "./utils/runServerOnCrash";
import sideProfileRoute from "./routes/sideProfile";
import uploadRoute from "./routes/uploadRoute";
import userRoute from "./routes/userRoute";
import verifyJWT from "./middlewares/verifyJWT";

//Load environment variables
dotenv.config();

//Initialize Express App
const app = express();

//connect to database
connectDB();

//middleware
app.use(
  cors({
    origin: `${process.env.FRONTEND_URL}`,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());
app.use(cookieParser());

// ping server before 15min
cron.schedule("*/14 * * * * ", () => {
  console.log("restarting server");

  http
    .get(`${process.env.BACKEND_URL}` as string, (res) => {
      if (res.statusCode === 200) {
        console.log("server restarted");
      } else {
        console.error(
          "failed to restart server with status code",
          res.statusCode
        );
      }
    })
    .on("error", (err) => {
      console.error("error during restart: ", err.message);
    });
});

// define  routes
app.get("/", (req: Request, res: Response) => {
  res.send("Socket.io ChatApp Server is Running...");
});

// Routes
app.use("/api/auth", authRoute);
app.use("/api/user", verifyJWT, userRoute);
app.use("/api/chatlist", verifyJWT, chatListRoute);
app.use("/api/conversation", verifyJWT, conversationRoute);
app.use("/api/friendRequest", verifyJWT, friendRequestRoute);
app.use("/api/message", verifyJWT, messageRoute);
app.use("/api/profile", verifyJWT, sideProfileRoute);

app.use(
  "/api/upload",
  express.static(path.join(__dirname, "./upload")),
  verifyJWT,
  uploadRoute
);
app.get(
  "/api/download/:filename",
  express.static(path.join(__dirname, "./upload")),
  verifyJWT,
  downLoadFile
);

// server files for frontend access
app.use(
  "/api/file",
  express.static(path.join(__dirname, "./upload")),
  (req, res) => {
    res.json(200);
  }
);

// 404 not found
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

// server not crash
runServerOnCrash();

// start the server
const PORT = process.env.PORT || 5000;
// const httpServer = createServer(app);
// initSocket(httpServer); // socket

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT} ${process.env.BACKEND_URL}`)
);
