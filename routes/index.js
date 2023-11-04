import express from "express";
import {
  getUsers,
  Register,
  Login,
  Logout,
  deleteUser,
} from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import {
  addDrone,
  getDrone,
  UpdateDrone,
  deleteDrone,
} from "../controllers/Dblocker.js";
import { Turn } from "../controllers/Turn.js";

const router = express.Router();

router.get("/users", verifyToken, getUsers);
router.post("/users", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);
router.delete("/delete/:id", deleteUser);

router.get("/drone", verifyToken, getDrone);
router.post("/drone", verifyToken, addDrone);
router.post("/drone/:id", verifyToken, Turn);
router.put("/drone/edit/:id", UpdateDrone);
router.delete("/drone/deleted/:id", deleteDrone);

export default router;
