import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      correo: user.correo,
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
