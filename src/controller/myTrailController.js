import { prisma } from "../prisma/client.js";

class MyTrailController {
  async subscribeInTrail(req, res) {
    try {
      const { id } = req.params;
      const { trailId } = req.body;

      const user = await prisma.user.findUnique({ where: { id: Number(id) } });

      if (!user) return res.json({ message: "user not found" });

      const trail = await prisma.trail.findUnique({
        where: { id: Number(trailId) }
      });

      if (!trail) return res.json({ error: "trail not found" });

      const myTrail = await prisma.myTrails.findMany({
        where: {trailId:trail.id,userId:Number(user.id),}
      });

      if (myTrail.length) return res.json({ message: "user subscribed in this trail!" });
        
      const subscribeOnTrail = await prisma.myTrails.create({
        data: {
          trailId,
          userId: user.id
        }
      });

      return res.json({ subscribeOnTrail });
    } catch (error) {
      return res.json({ error });
    }
  }

  async findAllMyTrail(req,res){
    try {
      const myTrail = await prisma.myTrails.findMany();
      return res.json(myTrail);
    } catch (error) {
      return res.json({ error });
    }
  }

  async deleteMyTrail(req,res){
    try {
      const { id } = req.params;

      const myTrail = await prisma.myTrails.delete({ where: { id: Number(id) } });
      return res.json(myTrail);
    } catch (error) {
      return res.json({ error });
    }
  }
}

export { MyTrailController };
