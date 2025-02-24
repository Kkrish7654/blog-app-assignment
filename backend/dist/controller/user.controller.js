"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("../service/user.service"));
const response_1 = require("../utils/response");
class UserController {
    static async createUser(req, res) {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                return res.json({ message: "Something is missing?" });
            }
            const data = await user_service_1.default.userCreate(req);
            if (data.error === 401)
                return res.status(200).json({
                    type: "exist",
                    message: data.message,
                });
            return (0, response_1.sendResponse)(200, "User added", data, res);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.json({ message: "Something is missing?" });
            }
            const data = await user_service_1.default.loginUser(req);
            if (data?.status === 404) {
                return (0, response_1.sendResponse)(data?.status, "Login Failed", data, res);
            }
            return (0, response_1.sendResponse)(201, "Login Succesfully", data, res);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
exports.default = UserController;
