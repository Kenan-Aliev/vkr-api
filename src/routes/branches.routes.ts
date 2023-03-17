import { Router } from "express";
import { checkRoleMiddleware, checkAuth } from "../middlewares";
import { branchesControllers } from "../controllers";
import { createBranchValidators, editBranchValidators } from "../validators";
import { Roles } from "@prisma/client";

const router = Router();

router.post(
  "/create",
  createBranchValidators,
  checkAuth,
  checkRoleMiddleware([Roles.SUPERADMIN]),
  branchesControllers.create
);

router.put(
  "/edit/:id",
  editBranchValidators,
  checkAuth,
  checkRoleMiddleware([Roles.SUPERADMIN]),
  branchesControllers.edit
);

router.get(
  "/details/:id",
  checkAuth,
  checkRoleMiddleware([Roles.SUPERADMIN]),
  branchesControllers.getById
);

router.get(
  "/list",
  checkAuth,
  checkRoleMiddleware([Roles.SUPERADMIN]),
  branchesControllers.getList
);


router.delete(
	"/delete/:id",
	checkAuth,
	checkRoleMiddleware([Roles.SUPERADMIN]),
	branchesControllers.delete
  );

export default router;
