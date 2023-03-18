import { Roles } from "@prisma/client";
import { Router } from "express";
import { managerControllers } from "../controllers";
import { checkAuth, checkRoleMiddleware } from "../middlewares";
import { createManagerValidators } from "../validators";

const router = Router();

router.post(
  "/create",
  createManagerValidators,
  checkAuth,
  checkRoleMiddleware([Roles.SUPERADMIN]),
  managerControllers.create
);

router.get(
  "/list",
  checkAuth,
  checkRoleMiddleware([Roles.SUPERADMIN]),
  managerControllers.getList
);

router.get(
  "/:id",
  checkAuth,
  checkRoleMiddleware([Roles.SUPERADMIN]),
  managerControllers.getByID
);

export default router;
