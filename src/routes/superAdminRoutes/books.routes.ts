import { checkAuth, checkRoleMiddleware } from "@/middlewares";
import { Roles } from "@prisma/client";
import { Router } from "express";
import { booksControllers } from "@/controllers";
import { createBookValidators } from '@/validators';

const router = Router();

router.post(
  "/create",
  createBookValidators,
  checkAuth,
  checkRoleMiddleware([Roles.SUPERADMIN]),
  booksControllers.create
);

export default router;
