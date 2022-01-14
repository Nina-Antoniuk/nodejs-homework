import { Router } from "express";
import guard from "../../../middlewares/guard";
import {
  registration,
  login,
  logout,
  current,
} from "../../../controllers/auth";
import userValidation from "../../../middlewares/validation/userValidation";

const router = new Router();

router.post("/signup", userValidation, registration);
router.post("/login", userValidation, login);
router.post("/logout", guard, logout);
router.post("/current", guard, current);

export default router;
