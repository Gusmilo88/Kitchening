const { check } = require("express-validator");

module.exports = [

    check("title")
        .notEmpty().withMessage("El título del curso es obligatorio").bail()
        .isLength({ min : 5, max : 30}).withMessage("El título debe tener entre 5 y 30 caracteres"),

    check("price")
        .notEmpty().withMessage("El precio del curso es obligatorio").bail()
        .isInt({min : 1}).withMessage("Solo números positivos"),

    check("chef")
        .notEmpty().withMessage("El chef del curso es obligatorio"),

    check("description")
        .notEmpty().withMessage("La descripción del curso es obligatoria").bail()
        .isLength({ min : 20, max : 99}).withMessage("La descripción debe tener entre 20 y 99 caracteres"),

    check("section")
        .notEmpty().withMessage("¿A qué sección pertenece?")
]