import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (!token) {
      return res.status(401).json({ message: "Token não fornecido." });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) {
        res.status(403).send("não foi possivel autenticar!").end();
        return;
      }
      next();
    });
  } catch {
    return res.status(400).send("não foi possivel autenticar!");
  }
};
