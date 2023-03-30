import { body } from "express-validator";

export const createBookValidators = [
  body("title")
    .isString()
    .withMessage("Название книги должно быть строкой")
    .trim(),
  body("quantity")
    .isInt()
    .withMessage("Количество книг должно быть целым числом")
    .custom((value) => {
      return value > 0;
    })
    .withMessage("Количество книг должно быть больше нуля"),
  body("price")
    .isNumeric()
    .withMessage("Цена книги должно быть числом")
    .custom((value) => {
      return value > 0;
    })
    .withMessage("Цена книги должна быть неотрицательным числом и больше нуля"),
  body("subjectId").isInt().withMessage("ID предмета должен быть целым числом"),
  body("branchId").isInt().withMessage("ID филиала должен быть целым числом"),
];
