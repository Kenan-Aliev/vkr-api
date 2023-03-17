import { body } from "express-validator";

export const createBranchValidators = [
  body("name")
    .isString()
    .withMessage("Название филиала должно быть строкой")
    .trim(),
  body("address")
    .isString()
    .withMessage("Адрес филиала должен быть строкой")
    .trim(),
];
