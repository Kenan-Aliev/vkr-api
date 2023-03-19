import { body } from "express-validator";

export const createTariffValidators = [
  body("name")
    .isString()
    .withMessage("Название тарифа должно быть строкой")
    .trim(),
  body("price_for_lesson")
    .isInt({ gt: 0 })
    .withMessage("Цена за урок должна быть числом и больше нуля"),
  body("total_price")
    .isInt()
    .withMessage("Общая цена тарифа должна быть числом")
    .custom((value, { req }) => {
      return value > req.body.price_for_lesson;
    })
    .withMessage("Общая цена должна быть больше чем цена за урок"),
];
