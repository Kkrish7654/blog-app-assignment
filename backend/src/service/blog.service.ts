import { Request } from "express";
import Blog from "../models/blog.model";
import User from "../models/user.model";

class BlogService {
  static async createBlog(req: Request) {
    const { title, content, authorId } = req.body;

    console.log(title, authorId, "authorId");

    try {
      // Check if the author exists
      const author = await User.findById(authorId);
      if (!author) {
        return { status: 404, message: "Author not found" };
      }

      console.log(author);

      const blog = new Blog({
        title,
        content,
        author: author._id,
        imageUrl: req.file ? req.file.path : undefined,
      });

      const savedBlog = await blog.save();

      return { status: 201, data: savedBlog };
    } catch (error: any) {
      return { status: 500, message: error.message };
    }
  }

  static async getAllBlogs() {
    const blogs = await Blog.find().populate("author", "name email");
    return { status: 200, data: blogs };
  }

  static async getBlogById(id: string) {
    console.log("Fetching blog with ID:", id);
    const blog = await Blog.findById(id).populate("author", "name email");
    if (!blog) {
      console.log("Blog not found with ID:", id);
      return { status: 404, message: "Blog not found" };
    }
    console.log("Found blog:", blog);
    return { status: 200, data: blog };
  }

  static async getBlogsByAuthor(authorId: string) {
    const blogs = await Blog.find({ author: authorId }).populate(
      "author",
      "name email"
    );
    if (!blogs) {
      return { status: 404, message: "Blogs not found" };
    }

    return { status: 200, data: blogs };
  }

  static async updateBlog(req: Request) {
    const { id } = req.params;
    const { title, content } = req.body;

    const updateData = {
      title: title,
      content: content,
      updatedAt: new Date(),
    };

    try {
      const blog = await Blog.findByIdAndUpdate(id, updateData, { new: true });

      if (!blog) {
        return { status: 404, message: "Blog not found" };
      }

      return { status: 200, data: blog };
    } catch (error) {
      console.error("Error updating blog:", error);
      return { status: 500, message: "Failed to update blog" };
    }
  }

  static async deleteBlog(id: string) {
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return { status: 404, message: "Blog not found" };
    }

    return { status: 200, message: "Blog deleted successfully" };
  }
}

export default BlogService;
