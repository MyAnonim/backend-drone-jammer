import express from "express";
import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import {
  addDrone,
  getDrone,
  Turn,
  UpdateDrone,
} from "../controllers/Dblocker.js";

const router = express.Router();

router.get("/users", verifyToken, getUsers);
router.post("/users", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);

router.get("/drone", getDrone);
router.post("/drone", addDrone);
router.post("/turn/:id", Turn);
router.put("/drone/:id", UpdateDrone);

export default router;
