import { Router } from "express";
import guard from "../../../middlewares/guard";
import AuthControllers from "../../../controllers/auth";
import userValidation from "../../../middlewares/validation/userValidation";

const authControllers = new AuthControllers();
const router = new Router();

router.post("/signup", userValidation, authControllers.registration);
router.post("/login", userValidation, authControllers.login);
router.post("/logout", guard, authControllers.logout);
router.post("/current", guard, authControllers.current);

export default router;
