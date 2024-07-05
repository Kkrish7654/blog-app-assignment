"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
mongoose_1.default.connect("mongodb://localhost:27017/blog-app");
// Routes Import
const user_route_1 = __importDefault(require("./routes/user.route"));
const blog_route_1 = __importDefault(require("./routes/blog.route"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "uploads")));
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Routes
app.use("/api/users", user_route_1.default);
app.use("/api/blogs", blog_route_1.default);
exports.default = app;
