import { body, validationResult } from "express-validator";

export const validateSignup = [
  body("firebaseUid").notEmpty().withMessage("firebaseUid es requerido"),

  body("firebasePhotoURL")
    .optional()
    .isURL()
    .withMessage("firebasePhotoURL debe ser una URL válida"),

  body("correo").isEmail().withMessage("Correo electrónico inválido"),

  body("nombreCompleto")
    .notEmpty()
    .withMessage("Nombre completo es requerido")
    .isLength({ min: 2, max: 100 })
    .withMessage("Nombre completo debe tener entre 2 y 100 caracteres"),

  body("multiplePrestamos")
    .isBoolean()
    .withMessage("multiplePrestamos debe ser un valor booleano"),

  body("telefono")
    .notEmpty()
    .withMessage("Teléfono es requerido")
    .matches(/^\+?[1-9]\d{1,14}$/)
    .withMessage("Formato de teléfono inválido"),

  body("nombreEmpresa")
    .notEmpty()
    .withMessage("Nombre de empresa es requerido")
    .isLength({ min: 2, max: 100 })
    .withMessage("Nombre de empresa debe tener entre 2 y 100 caracteres"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/)
    .withMessage(
      "La contraseña debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial"
    ),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    next();
  },
];

export const validateLogin = [
  body("correo").isEmail().withMessage("Correo electrónico inválido"),

  body("password").notEmpty().withMessage("La contraseña es requerida"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    next();
  },
];
