import { Router } from "express";
import ensureAuthenticated from "./midleware/ensureAuthenticated.js";
import { UserController } from "./controller/userController.js";
import { PostController } from "./controller/postController.js";
import { AuthUserController } from "./controller/authUserController.js";
import { TrailController } from "./controller/trailController.js";
import { CourseController } from "./controller/courseController.js";
import { TopicController } from "./controller/topicController.js";
import { LessonController } from "./controller/lessonController.js";
import { MyTrailController } from "./controller/myTrailController.js";

const authUserController = new AuthUserController();
const postController = new PostController();
const userController = new UserController();
const trailController = new TrailController();
const courseController = new CourseController();
const topicController = new TopicController();
const lessonController = new LessonController();
const myTrailController = new MyTrailController();
const router = Router();
// USER
router.post("/user", userController.createUser);
router.get("/user", userController.findAllUser);
router.get("/user/:id", userController.findUniqueUser);
router.put("/user/:id", userController.update);
router.delete("/user/:id", userController.delete);
// TRILHAS DO USUARIO
router.post("/my-trail/:id", myTrailController.subscribeInTrail);
router.get("/my-trail/", myTrailController.findAllMyTrail);
router.delete("/my-trail/:id", myTrailController.deleteMyTrail);
// BLOG
router.post("/post/:id",ensureAuthenticated, postController.createPost);
router.get("/post", ensureAuthenticated, postController.findAllPosts);
router.get("/post/:id",ensureAuthenticated, postController.findUniquePost);
router.get("/post/article/:title",ensureAuthenticated, postController.findUniquePostByTitle);
router.put("/post/:id",ensureAuthenticated, postController.updatePost);
router.delete("/post/:id",ensureAuthenticated, postController.delete);
// AUTHENTICATED
router.post("/login", authUserController.sigin);
// TRILHAS
router.post("/trail/:id", trailController.createTrail);
router.get("/trail", trailController.findAllTrails);
router.get("/trail/:id", trailController.findUniqueTrail);
router.put("/trail/:id", trailController.updateTrail);
router.delete("/trail/:id", trailController.deleteTrail);
// COURSES
router.post("/course/:trailId", courseController.createCourse);
router.get("/course", courseController.findAllCourses);
router.get("/course/:id", courseController.findUniqueCourse);
router.put("/course/:id", courseController.updateCourse);
router.delete("/course/:id", courseController.deleteCourse);
// TOPICOS
router.post("/topic/:courseId", topicController.createTopic);
router.get("/topic", topicController.findAllTopics);
router.get("/topic/:id", topicController.findUniqueTopic);
router.delete("/topic/:id", topicController.deleteTopic);
// LESSONS
router.post("/lesson/:topicId", ensureAuthenticated,lessonController.createLesson);
router.get("/lesson",ensureAuthenticated ,lessonController.findAllLessons);

export { router };
