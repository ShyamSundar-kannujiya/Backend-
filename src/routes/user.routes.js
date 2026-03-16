import { Router } from "express";
import {
  loginUser,
  logoutUser,
  ragisterUser,
  refreshAccessToken,
} from "../controllers/user.controller.js";

import { upload } from "../middlewars/multer.middleware.js";
import { verifyJWT } from "../middlewars/auth.middleware.js";

const router = Router();

router.route("/ragister").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  ragisterUser
);
router.route("/login").post(loginUser);

// Secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);

export default router;
