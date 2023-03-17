import { body, check } from "express-validator";

export const editBranchValidators = [
  check("id").isString().withMessage("Укажите id редактируемого филиала"),
  body("name")
    .isString()
    .withMessage("Название филиала должно быть строкой")
    .trim(),
  body("address")
    .isString()
    .withMessage("Адрес филиала должен быть строкой")
    .trim(),
];
