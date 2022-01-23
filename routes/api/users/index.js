import { Router } from "express";
import guard from "../../../middlewares/guard";
import { upload } from "../../../middlewares/upload";
import userControls from "../../../controllers/user";
const router = new Router();

router.patch(
  "/avatar",
  guard,
  upload.single("avatar"),
  userControls.uploadAvatar
);
router.get("/verify/:verificationToken", userControls.verifyUser);
router.post("/verify", userControls.repeatEmailFromVerifyUser);

export default router;
