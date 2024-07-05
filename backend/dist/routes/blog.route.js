"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blog_controller_1 = __importDefault(require("../controller/blog.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const upload_middleware_1 = __importDefault(require("../middleware/upload.middleware"));
const router = (0, express_1.Router)();
router.post("/post", auth_middleware_1.requireAuth, upload_middleware_1.default.single("image"), blog_controller_1.default.createBlogs);
router.get("/get-all", blog_controller_1.default.getAllBlogs);
router.get("/get/:id", blog_controller_1.default.getBlogById);
router.get("/get-by-author/:id", blog_controller_1.default.getBlogsByAuthor);
router.put("/update/:id", blog_controller_1.default.updateBlog);
exports.default = router;
