import jwt from "jsonwebtoken";

export const TokenGen = async (req, res, next) => {
  try {
    const token = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: '360d'});

    res.status(200).json({ token });
    next();

  } catch {
    return res
      .status(400)
      .send("não foi possivel fazer a busca no banco de dados");
  }
};
