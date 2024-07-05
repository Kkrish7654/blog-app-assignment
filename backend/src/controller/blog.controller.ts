import { Request, Response } from "express";
import BlogService from "../service/blog.service";
import { sendResponse } from "../utils/response";

class BlogController {
  static async createBlogs(req: Request, res: Response) {
    try {
      const data: any = await BlogService.createBlog(req);

      return sendResponse(200, "Blog added", data, res);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getAllBlogs(req: Request, res: Response) {
    try {
      const data: any = await BlogService.getAllBlogs();

      return sendResponse(200, "All Blogs", data, res);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getBlogById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data: any = await BlogService.getBlogById(id);

      return sendResponse(200, "Blog", data, res);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getBlogsByAuthor(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data: any = await BlogService.getBlogsByAuthor(id);

      return sendResponse(200, "Blogs", data, res);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateBlog(req: Request, res: Response) {
    try {
      const data: any = await BlogService.updateBlog(req);

      return sendResponse(200, "Blog updated", data, res);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default BlogController;
