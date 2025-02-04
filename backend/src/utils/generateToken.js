import jwt from "jsonwebtoken";
const { JWT_SECRET } = process.env;

export const generateToken = (id, res) => {
  const token = jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("token", token);

  return token;
};
