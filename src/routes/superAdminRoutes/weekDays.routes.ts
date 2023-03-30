import { weekDaysControllers } from "@/controllers";
import { checkAuth, checkRoleMiddleware } from "@/middlewares";
import { createWeekDayValidators } from "@/validators";
import { Roles } from "@prisma/client";
import { Router } from "express";

const router = Router();

router.post(
  "/create",
  createWeekDayValidators,
  checkAuth,
  checkRoleMiddleware([Roles.SUPERADMIN]),
  weekDaysControllers.create
);

router.get(
  "/list",
  checkAuth,
  checkRoleMiddleware([Roles.SUPERADMIN]),
  weekDaysControllers.getList
);

router.get(
  "/details/:id",
  checkAuth,
  checkRoleMiddleware([Roles.SUPERADMIN]),
  weekDaysControllers.details
);

router.put(
  "/edit/:id",
  createWeekDayValidators,
  checkAuth,
  checkRoleMiddleware([Roles.SUPERADMIN]),
  weekDaysControllers.edit
);

router.delete(
  "/delete/:id",
  checkAuth,
  checkRoleMiddleware([Roles.SUPERADMIN]),
  weekDaysControllers.delete
);

export default router;
