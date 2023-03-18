import { Roles } from "@prisma/client";
import { Router } from "express";
import { checkAuth, checkRoleMiddleware } from "../middlewares";
import { subjectsControllers } from "../controllers";
import { createSubjectValidors } from "../validators";

const router = Router();

router.post(
  "/create",
  createSubjectValidors,
  checkAuth,
  checkRoleMiddleware([Roles.SUPERADMIN]),
  subjectsControllers.create
);

router.get(
  "/list",
  checkAuth,
  checkRoleMiddleware([Roles.SUPERADMIN]),
  subjectsControllers.getList
);

router.get(
  "/details/:id",
  checkAuth,
  checkRoleMiddleware([Roles.SUPERADMIN]),
  subjectsControllers.getById
);

router.put(
  "/edit/:id",
  createSubjectValidors,
  checkAuth,
  checkRoleMiddleware([Roles.SUPERADMIN]),
  subjectsControllers.edit
);

router.delete(
  "/delete/:id",
  checkAuth,
  checkRoleMiddleware([Roles.SUPERADMIN]),
  subjectsControllers.delete
);

export default router;
