import { Router } from "express";
import userController from "./controller/userController.js";
import postController from "./controller/postController.js";

const router = Router();

router.post("/user",userController.createUser);
router.get('/user',userController.findAllUser)
router.get('/user/:id',userController.findUniqueUser)
router.put('/user/:id',userController.update)
router.delete('/user/:id',userController.delete)

router.post("/post/user/:id",postController.createPost);
router.get('/post',postController.findAllPosts)
router.get('/post/:id',postController.findUniquePost)
router.put('/post/:id',postController.updatePost)

export { router };

