import { prisma } from "../prisma/client.js";
import bcrypt  from "bcryptjs";

export default {
  async createUser(req, res) {
    try {
      const { name, email, password } = req.body;
      let user = await prisma.user.findUnique({ where: { email } });

      if (user) {
        return res.json({ error: "user exists on db" });
      }

      const pass = await bcrypt.hash(password,8);

      user = await prisma.user.create({
        data: {
          name,
          email,
          password:pass
        }
      });

      return res.json(user);
    } catch (error) {
      return res.json({ error });
    }
  },

  async findAllUser(req, res) {
    try {
      const user = await prisma.user.findMany();
      return res.json(user);
    } catch (error) {
      return res.json({ error });
    }
  },

  async findUniqueUser(req, res) {
    try {
      const { id } = req.params;
      const user = await prisma.user.findUnique({ where: { id: Number(id) } });
      return res.json(user);
    } catch (error) {
      return res.json({ error });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, email } = req.body;

      let user = await prisma.user.findUnique({ where: { id: Number(id) } });

      if (!user) {
        return res.json({ error: "user not exists on db" });
      }

      user = await prisma.user.update({
        where: { id: Number(id) },
        data: { name, email }
      });

      return res.json(user);
    } catch (error) {
      return res.json({ error });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      let user = await prisma.user.findUnique({ where: { id: Number(id) } });

      if (!user) {
        return res.json({ error: "user not exists on db" });
      }

      await prisma.user.delete({ where: { id: Number(id) } });

      return res.json(user);
    } catch (error) {
      return res.json({ error });
    }
  }
};
