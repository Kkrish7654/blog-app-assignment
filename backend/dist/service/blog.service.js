"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blog_model_1 = __importDefault(require("../models/blog.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
class BlogService {
    static async createBlog(req) {
        const { title, content, authorId } = req.body;
        console.log(title, authorId, "authorId");
        try {
            // Check if the author exists
            const author = await user_model_1.default.findById(authorId);
            if (!author) {
                return { status: 404, message: "Author not found" };
            }
            console.log(author);
            const blog = new blog_model_1.default({
                title,
                content,
                author: author._id,
                imageUrl: req.file ? req.file.path : undefined,
            });
            const savedBlog = await blog.save();
            return { status: 201, data: savedBlog };
        }
        catch (error) {
            return { status: 500, message: error.message };
        }
    }
    static async getAllBlogs() {
        const blogs = await blog_model_1.default.find().populate("author", "name email");
        return { status: 200, data: blogs };
    }
    static async getBlogById(id) {
        console.log("Fetching blog with ID:", id);
        const blog = await blog_model_1.default.findById(id).populate("author", "name email");
        if (!blog) {
            console.log("Blog not found with ID:", id);
            return { status: 404, message: "Blog not found" };
        }
        console.log("Found blog:", blog);
        return { status: 200, data: blog };
    }
    static async getBlogsByAuthor(authorId) {
        const blogs = await blog_model_1.default.find({ author: authorId }).populate("author", "name email");
        if (!blogs) {
            return { status: 404, message: "Blogs not found" };
        }
        return { status: 200, data: blogs };
    }
    static async updateBlog(req) {
        const { id } = req.params;
        const { title, content } = req.body;
        const updateData = {
            title: title,
            content: content,
            updatedAt: new Date(),
        };
        try {
            const blog = await blog_model_1.default.findByIdAndUpdate(id, updateData, { new: true });
            if (!blog) {
                return { status: 404, message: "Blog not found" };
            }
            return { status: 200, data: blog };
        }
        catch (error) {
            console.error("Error updating blog:", error);
            return { status: 500, message: "Failed to update blog" };
        }
    }
    static async deleteBlog(id) {
        const blog = await blog_model_1.default.findByIdAndDelete(id);
        if (!blog) {
            return { status: 404, message: "Blog not found" };
        }
        return { status: 200, message: "Blog deleted successfully" };
    }
}
exports.default = BlogService;
