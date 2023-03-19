import { body } from "express-validator";

export const createAdSourcesValidators = [
  body("name").isString().withMessage("Название источника должно быть строкой"),
];
