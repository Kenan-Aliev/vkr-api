import { body } from "express-validator";

export const createSubjectValidors = [
  body("name")
    .isString()
    .withMessage("Название предмета должно быть строкой")
    .trim(),
];
