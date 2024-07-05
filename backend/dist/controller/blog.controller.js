"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blog_service_1 = __importDefault(require("../service/blog.service"));
const response_1 = require("../utils/response");
class BlogController {
    static async createBlogs(req, res) {
        try {
            const data = await blog_service_1.default.createBlog(req);
            return (0, response_1.sendResponse)(200, "Blog added", data, res);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async getAllBlogs(req, res) {
        try {
            const data = await blog_service_1.default.getAllBlogs();
            return (0, response_1.sendResponse)(200, "All Blogs", data, res);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async getBlogById(req, res) {
        try {
            const { id } = req.params;
            const data = await blog_service_1.default.getBlogById(id);
            return (0, response_1.sendResponse)(200, "Blog", data, res);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async getBlogsByAuthor(req, res) {
        try {
            const { id } = req.params;
            const data = await blog_service_1.default.getBlogsByAuthor(id);
            return (0, response_1.sendResponse)(200, "Blogs", data, res);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async updateBlog(req, res) {
        try {
            const data = await blog_service_1.default.updateBlog(req);
            return (0, response_1.sendResponse)(200, "Blog updated", data, res);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
exports.default = BlogController;
