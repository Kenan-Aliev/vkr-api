import { Router } from "express";
import { authControllers } from "../../controllers";
import { checkAuth } from "../../middlewares";

const router = Router();

router.post("/login", authControllers.login);
router.get("/getProfile", checkAuth, authControllers.getProfile);

export default router;
