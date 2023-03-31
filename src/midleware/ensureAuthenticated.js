import jwt from "jsonwebtoken";

export default function ensureAuthenticated(req, res, next) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ message: "Token Is missing" });
  }

  const [, token] = authToken.split(" ");

  try {
    jwt.verify(token, process.env.JWT_SECRET);

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
}
