import { body } from "express-validator";

export const createTimeValidators = [
  body("name").isString().withMessage("Время должно быть строкой"),
];
