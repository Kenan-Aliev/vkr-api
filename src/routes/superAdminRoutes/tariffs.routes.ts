import { Roles } from "@prisma/client";
import { Router } from "express";
import { checkAuth, checkRoleMiddleware } from "@/middlewares";
import { tariffsControllers } from "@/controllers";
import { createTariffValidators } from "@/validators";

const router = Router();

router.post(
  "/create",
  createTariffValidators,
  checkAuth,
  checkRoleMiddleware([Roles.SUPERADMIN]),
  tariffsControllers.create
);

router.get(
  "/list",
  checkAuth,
  checkRoleMiddleware([Roles.SUPERADMIN]),
  tariffsControllers.getList
);

router.get(
  "/details/:id",
  checkAuth,
  checkRoleMiddleware([Roles.SUPERADMIN]),
  tariffsControllers.details
);


router.put(
  "/edit/:id",
  createTariffValidators,
  checkAuth,
  checkRoleMiddleware([Roles.SUPERADMIN]),
  tariffsControllers.edit
);

router.delete(
  "/delete/:id",
  checkAuth,
  checkRoleMiddleware([Roles.SUPERADMIN]),
  tariffsControllers.delete
);

export default router;
