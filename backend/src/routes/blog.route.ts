import { Router } from "express";
import BlogController from "../controller/blog.controller";
import { requireAuth } from "../middleware/auth.middleware";
import upload from "../middleware/upload.middleware";

const router = Router();

router.post(
  "/post",
  requireAuth,
  upload.single("image"),
  BlogController.createBlogs
);
router.get("/get-all", BlogController.getAllBlogs);
router.get("/get/:id", BlogController.getBlogById);
router.get("/get-by-author/:id", BlogController.getBlogsByAuthor);
router.put("/update/:id", BlogController.updateBlog);

export default router;
