import { body } from "express-validator";

export const editManagerValidators = [
  body("name")
    .isString()
    .withMessage("Имя менеджера должно быть строкой")
    .trim(),
  body("surname")
    .isString()
    .withMessage("Фамилия менеджера должна быть строкой")
    .trim(),
  body("patronymic")
    .isString()
    .withMessage("Отчество менеджера должно быть строкой")
    .trim(),
  body("date_birth")
    .isISO8601()
    .toDate()
    .withMessage("Дата рождения должна быть датой")
    .trim(),
];
