import { prisma } from "../prisma/client.js";

class CourseController {
  async createCourse(req, res) {
    try {
      const { trailId } = req.params;

      const { title, description } = req.body;

      const trail = await prisma.trail.findUnique({
        where: { id: Number(trailId) }
      });

      if (!trail) return res.json({ error: "trail not found" });

      const course = await prisma.course.create({
        data: {
          title,
          description,
          trailId: trail.id
        }
      });

      return res.json({ course });
    } catch (error) {
      return res.json({ error });
    }
  }

  async findAllCourses(req, res) {
    try {
      const courses = await prisma.course.findMany({
        include: {
          Topic: true
        }
      });
      return res.json({ courses });
    } catch (error) {
      return res.json({ error });
    }
  }

  async findUniqueCourse(req, res) {
    try {
      const { id } = req.params;
      const course = await prisma.course.findUnique({
        where: { id: Number(id) },
        include: {
          Topic: true
        }
      });

      if (!course) return res.json({ error: "course not found" });

      return res.json({ course });
    } catch (error) {
      return res.json({ error });
    }
  }

  async updateCourse(req, res) {
    try {
      const { id } = req.params;
      const { title, description, duration } = req.body;

      const course = await prisma.course.findUnique({
        where: { id: Number(id) }
      });

      if (!course) return res.json({ error: "course not Found!" });

      const courseUpdate = await prisma.course.update({
        where: { id: Number(id) },
        data: {
          title: title || course.title,
          description: description || course.description,
          duration: duration || course.duration,
          trailId: course.userId
        }
      });

      return res.json({ trail: courseUpdate });
    } catch (error) {
      return res.json({ error });
    }
  }

  async deleteCourse(req, res) {
    try {
      const { id } = req.params;

      const course = await prisma.course.findUnique({
        where: { id: Number(id) }
      });

      if (!course) return res.json({ error: "course not found" });

      await prisma.course.delete({ where: { id: Number(id) } });

      return res.json({ course: "course deleted!" });
    } catch (error) {
      return res.json({ error });
    }
  }
}

export { CourseController };
