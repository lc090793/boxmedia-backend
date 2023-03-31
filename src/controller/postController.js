import { prisma } from "../prisma/client.js";

class PostController {
  async createPost(req, res) {
    const { title, content } = req.body;
    const { id } = req.params;

    try {
      const user = await prisma.user.findUnique({ where: { id: Number(id) } });

      if (!user) {
        return res.json({ error: "user doesnt exists on database!" });
      }
      const post = await prisma.post.create({
        data: {
          title,
          content,
          authorId: user.id
        },
        include: {
          author: true
        }
      });

      return res.json(post);
    } catch (error) {
      return res.json({ error });
    }
  }

  async findAllPosts(req, res) {
    try {
      const post = await prisma.post.findMany({});
      return res.json({ post });
    } catch (error) {
      return res.json({ error });
    }
  }

  async findUniquePost(req, res) {
    const { id } = req.params;

    try {
      const post = await prisma.post.findUnique({ where: { id: Number(id) } });

      if (!post) return res.json({ error: "post doesnt exists" });

      return res.json({ post });
    } catch (error) {
      return res.json({ error });
    }
  }

  async findUniquePostByTitle(req, res) {
    const { title } = req.params;

    try {
      const post = await prisma.post.findMany({
        where: {
          title: {
            startsWith: title.replace(/-/g, ' ')
          }
        }
      });

      if (!post) return res.json({ error: "post doesnt exists" });

      return res.json({ post });
    } catch (error) {
      return res.json({ error });
    }
  }

  async updatePost(req, res) {
    const { id } = req.params;
    const { content } = req.body;

    try {
      const post = await prisma.post.findUnique({ where: { id: Number(id) } });

      if (!post) return res.json({ error: "post doesnt exists" });

      await prisma.post.update({
        where: { id: Number(id) },
        data: { content }
      });
      return res.json({ post });
    } catch (error) {
      return res.json({ error });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      let post = await prisma.post.findUnique({ where: { id: Number(id) } });

      if (!post) {
        return res.json({ error: "post not exists on db" });
      }

      await prisma.post.delete({ where: { id: Number(id) } });

      return res.json(post);
    } catch (error) {
      return res.json({ error });
    }
  }
}

export { PostController };
