import { Router } from "express";
import {
  registratoin,
  login,
  logout,
  currentUser,
  updateSubscription,
} from "../../../controllers/auth";

import {
  uploadAvatar,
  verifyUser,
  repeatEmailForVerifyUser,
} from "../../../controllers/users";

import guard from "../../../middlewares/guard";
import limiter from "../../../middlewares/rate-limit";
import { upload } from "../../../middlewares/upload";
import { validateAuth, validateUpdateSubscription } from "./validation";

const router = new Router();

router.post("/signup", limiter(15 * 60 * 1000, 2), validateAuth, registratoin);
router.post("/login", validateAuth, login);
router.post("/logout", guard, logout);
router.post("/current", guard, currentUser);
router.patch("/", guard, validateUpdateSubscription, updateSubscription);

router.patch("/avatars", guard, upload.single("avatar"), uploadAvatar);

router.get("/verify/:verificationToken", verifyUser);
router.post("/verify", repeatEmailForVerifyUser);

export default router;
