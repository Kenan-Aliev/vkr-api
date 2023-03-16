import { Router } from "express";
import { managerControllers } from "../controllers";

const router = Router();

router.post("/create", managerControllers.create);

export default router;
