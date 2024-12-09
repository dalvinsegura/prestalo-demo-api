import { createUser, findUserByEmail } from "../services/user.service.js";
import { generateToken } from "../utils/jwt.utils.js";
import { comparePasswords } from "../utils/password.utils.js";
import { CustomError } from "../utils/custom-error.js";

export const signup = async (req, res, next) => {
  try {
    const userData = req.body;
    const newUser = await createUser(userData);

    res.status(201).json({
      success: true,
      data: newUser,
      message: "Usuario registrado exitosamente",
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { correo, password } = req.body;
    const user = await findUserByEmail(correo);

    if (!user) {
      throw new CustomError("Credenciales inválidas", 401);
    }

    const isPasswordValid = await comparePasswords(password, user.password);

    if (!isPasswordValid) {
      throw new CustomError("Credenciales inválidas", 401);
    }

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          correo: user.correo,
          nombreCompleto: user.nombreCompleto,
          nombreEmpresa: user.nombreEmpresa,
        },
      },
      message: "Inicio de sesión exitoso",
    });
  } catch (error) {
    next(error);
  }
};
