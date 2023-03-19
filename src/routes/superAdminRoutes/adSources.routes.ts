import { checkAuth, checkRoleMiddleware } from "@/middlewares";
import { Roles } from "@prisma/client";
import { Router } from "express";
import { adSourcesControllers } from "@/controllers";
import { createAdSourcesValidators } from "@/validators";

const router = Router();

router.post(
  "/create",
  createAdSourcesValidators,
  checkAuth,
  checkRoleMiddleware([Roles.SUPERADMIN]),
  adSourcesControllers.create
);

router.get(
  "/list",
  checkAuth,
  checkRoleMiddleware([Roles.SUPERADMIN]),
  adSourcesControllers.list
);

router.get(
  "/details/:id",
  checkAuth,
  checkRoleMiddleware([Roles.SUPERADMIN]),
  adSourcesControllers.details
);

router.put(
  "/edit/:id",
  createAdSourcesValidators,
  checkAuth,
  checkRoleMiddleware([Roles.SUPERADMIN]),
  adSourcesControllers.edit
);

router.delete(
  "/delete/:id",
  checkAuth,
  checkRoleMiddleware([Roles.SUPERADMIN]),
  adSourcesControllers.delete
);

export default router;
