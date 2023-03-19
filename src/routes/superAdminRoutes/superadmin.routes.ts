import { Router } from "express";
import { superadminControllers } from "@/controllers";

const router = Router();

router.post("/create", superadminControllers.create);


export default router