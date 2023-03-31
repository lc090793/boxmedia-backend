import { prisma } from "../prisma/client.js";

class LessonController {
  async createLesson(req, res) {
    try {
      const { topicId } = req.params;
      const { title, video, description } = req.body;

      const topic = await prisma.topic.findUnique({
        where: { id: Number(topicId) }
      });

      if (!topic) return res.json({ error: "topic not found!" });

      const lesson = await prisma.lesson.create({
        data: {
          title,
          video,
          description,
          topicId:topic.id
        }
      });
      return res.json({ lesson });
    } catch (error) {
      return res.json({ error });
    }
  }

  async findAllLessons(req,res){
    try {
        const lesson = await prisma.lesson.findMany()
        return res.json({ lesson });
    } catch (error) {
        return res.json({ error });
    }
  }
}

export { LessonController };
