import { Router } from "express";
import { validateSignup } from "../middleware/validation.middleware.js";
import { signup } from "../controllers/user.controller.js";
import { login } from "../controllers/user.controller.js";
import { validateLogin } from "../middleware/validation.middleware.js";

const router = Router();

router.post("/email/signup", validateSignup, signup);
router.post("/email/login", validateLogin, login);

export { router as userRouter };
