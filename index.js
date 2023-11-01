import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";
import router from "./routes/index.js";
// import { DblockerApi } from "./models/UserModel.js"; //create table
// import Drone from "./models/DroneModel.js";
dotenv.config();

const app = express();

try {
  await db.authenticate();
  console.log("Database Connected...");
  // await Drone.sync(); // create table
} catch (error) {
  console.error(error);
}

// (async () => {
//   await db.sync();
// })();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());

app.use(router);

app.listen(5000, () => console.log("server running at port 5000"));
