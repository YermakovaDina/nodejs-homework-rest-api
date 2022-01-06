import { Router } from "express";
import {
  registratoin,
  login,
  logout,
  currentUser,
  updateSubscription,
} from "../../../controllers/auth";
import guard from "../../../middlewares/guard";
import { validateAuth, validateUpdateSubscription } from "./validation";

const router = new Router();

router.post("/signup", validateAuth, registratoin);
router.post("/login", validateAuth, login);
router.post("/logout", guard, logout);
router.post("/current", guard, currentUser);
router.patch("/", guard, validateUpdateSubscription, updateSubscription);

export default router;
