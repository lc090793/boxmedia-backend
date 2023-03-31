import { prisma } from "../prisma/client.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dayjs from "dayjs";
class AuthUserController {
  async sigin(req, res) {
    try {
      const { email, password } = req.body;

      const userAlreadyExists = await prisma.user.findUnique({
        where: { email }
      });

      if (!userAlreadyExists) {
         return res.json({message:"User or Password incorrect!"});
      }

      const passwordMatch = await bcrypt.compare(
        password,
        userAlreadyExists.password
      );

      if (!passwordMatch) {
         return res.json({message:"User or Password incorrect!"});
      }

      const token = await jwt.sign(userAlreadyExists, process.env.JWT_SECRET, {
        expiresIn: "7d"
      });

      const expiresIn = dayjs().add(15, "second").unix();

      const refreshToken = await prisma.refreshToken.create({
        data: {
          userId: userAlreadyExists.id,
          expiresIn
        }
      });

      const user = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          email: true,
          name: true,
          myTrails: true,
          resume: true,
          photoURL: true,
          uid: true
        }
      });

      return res.json({user, token, refreshToken });
    } catch (error) {
      return res.json({ error });
    }
  }
}

export { AuthUserController };
