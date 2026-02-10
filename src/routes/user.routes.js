import { Router } from "express";
import { ragisterUser } from "../controllers/user.controller.js";

const router = Router();
router.route("/ragister").post(ragisterUser);
export default router; 