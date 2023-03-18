import { body } from "express-validator";

const operators: string[] = ["70", "77", "75", "55", "50", "99", "22"];

export const createManagerValidators = [
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
  body("phone")
    .isString()
    .withMessage("Номер телефона должен быть строкой")
    .custom((value) => {
      return value.length == 10 && operators.includes(value.slice(1, 3));
    })
    .withMessage("Неверный формат номера телефона. Пример: 0555123456")
    .trim(),
  body("branchId")
    .isNumeric()
    .withMessage("ID филиала должен быть целым числом"),
  body("password")
    .isString()
    .withMessage("Пароль должен быть строкой")
    .isLength({
      min: 5,
      max: 20,
    })
    .withMessage("Длина пароля долнда быть минимум 5 символов и максимум 20")
    .trim(),
];
