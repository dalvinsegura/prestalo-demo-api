import { CustomError } from "../utils/custom-error.js";
import { hashPassword } from "../utils/password.utils.js";

// Simulando una base de datos en memoria
let users = [];

export const createUser = async (userData) => {
  try {
    const existingUser = users.find((user) => user.correo === userData.correo);
    if (existingUser) {
      throw new CustomError("El usuario ya existe", 409);
    }

    const hashedPassword = await hashPassword(userData.password);

    const newUser = {
      ...userData,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: Math.random().toString(36).substr(2, 9),
    };

    users.push(newUser);

    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  } catch (error) {
    throw new CustomError("Error al crear usuario", 500);
  }
};

export const findUserByEmail = async (email) => {
  return users.find((user) => user.correo === email);
};
