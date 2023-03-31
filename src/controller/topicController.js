import { prisma } from "../prisma/client.js";

class TopicController {
  async createTopic(req, res) {
    try {
      const { courseId } = req.params;
      const { title } = req.body;

      const course = await prisma.course.findUnique({
        where: { id: Number(courseId) }
      });

      if (!course) return res.json({ error: "course not found!" });

      const topic = await prisma.topic.create({
        data: {
          title,
          courseId: course.id
        }
      });
      return res.json({ topic });
    } catch (error) {
      return res.json({ error });
    }
  }
  async findAllTopics(req, res) {
    try {
      const topic = await prisma.topic.findMany({
        include: {
          Lesson: true
        }
      });

      return res.json({ topic });
    } catch (error) {}
  }

  async findUniqueTopic(req, res) {
    try {
      const { id } = req.params;
      const topic = await prisma.topic.findUnique({
        where: { id: Number(id) },
        include: {
          Lesson: true
        }
      });

      if (!topic) return res.json({ error: "topic not found" });

      return res.json({ topic });
    } catch (error) {
      return res.json({ error });
    }
  }

  async deleteTopic(req, res) {
    try {
      const { id } = req.params;

      const topic = await prisma.topic.findUnique({where: { id: Number(id) }});

      if (!topic) return res.json({ error: "topic not found" });

      await prisma.topic.delete({ where: { id: Number(topic.id) } });

      return res.json({ topic });
    } catch (error) {
      return res.json({ error });
    }
  }
}

export { TopicController };
