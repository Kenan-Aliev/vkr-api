import { body } from "express-validator";

export const createWeekDayValidators = [
  body("name").isString().withMessage("Название должно быть строкой"),
];
