import { timeControllers } from "@/controllers";
import { checkAuth, checkRoleMiddleware } from "@/middlewares";
import { createTimeValidators } from "@/validators";
import { Roles } from "@prisma/client";
import { Router } from "express";

const router = Router();

router.post(
  "/create",
  createTimeValidators,
  checkAuth,
  checkRoleMiddleware([Roles.SUPERADMIN]),
  timeControllers.create
);

router.get(
  "/list",
  checkAuth,
  checkRoleMiddleware([Roles.SUPERADMIN]),
  timeControllers.getList
);

router.get(
  "/details/:id",
  checkAuth,
  checkRoleMiddleware([Roles.SUPERADMIN]),
  timeControllers.details
);

router.put(
  "/edit/:id",
  createTimeValidators,
  checkAuth,
  checkRoleMiddleware([Roles.SUPERADMIN]),
  timeControllers.edit
);

router.delete(
  "/delete/:id",
  checkAuth,
  checkRoleMiddleware([Roles.SUPERADMIN]),
  timeControllers.delete
);

export default router;
