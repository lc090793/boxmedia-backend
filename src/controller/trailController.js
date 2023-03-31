import { prisma } from "../prisma/client.js";

class TrailController {
  async createTrail(req, res) {
    try {
      const { id } = req.params;
      const { title, description, duration } = req.body;

      const user = await prisma.user.findUnique({ where: { id: Number(id) } });

      if (!user) {
        return res.json({ error: "user not found" });
      }
      const trail = await prisma.trail.create({
        data: {
          title,
          description,
          userId: user.id,
          duration
        },
        include: {
          user: true
        }
      });
      return res.json({ trail });
    } catch (error) {
      return res.json({ error });
    }
  }

  async findAllTrails(req, res) {
    try {
      const trail = await prisma.trail.findMany({
        include: {
          user: true
        }
      });
      return res.json({ trail });
    } catch (error) {
      return res.json({ error });
    }
  }

  async findUniqueTrail(req, res) {
    try {
      const { id } = req.params;
      const trail = await prisma.trail.findUnique({
        where: { id: Number(id) },
        include: {
          user: true,
          course:true
        }
      });

      if (!trail) return res.json({ error: "Trail not Found!" });

      return res.json({ trail });
    } catch (error) {
      return res.json({ error });
    }
  }

  async updateTrail(req, res) {
    try {
      const { id } = req.params;
      const { title, description, duration } = req.body;

      const trail = await prisma.trail.findUnique({where: { id: Number(id) }});

      if (!trail) return res.json({ error: "Trail not Found!" });

      const trailUpdate = await prisma.trail.update({
        where: { id: Number(id) },
        data: {
          title: title || trail.title,
          description: description || trail.description,
          duration: duration || trail.duration,
          userId: trail.userId
        }
      });

      return res.json({ trail: trailUpdate });
    } catch (error) {
      return res.json({ error });
    }
  }

  async deleteTrail(req, res) {
    try {
      const { id } = req.params;

      const trail = await prisma.trail.findUnique({where: { id: Number(id) }});

      if (!trail) return res.json({ error: "Trail not Found!" });

      await prisma.trail.delete({ where: { id: Number(id) } });

      return req.json({ trail });
    } catch (error) {
      return res.json({ error });
    }
  }
}

export { TrailController };
