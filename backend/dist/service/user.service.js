"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const secretKey = process.env.SECRET_KEY || "kkrish7654";
class UserService {
    static async userCreate(req) {
        const { name, email, password } = req.body;
        const salt = 10;
        const hashPassword = await bcrypt_1.default.hash(password, salt);
        const existingEmail = await user_model_1.default.findOne({ email });
        if (existingEmail) {
            return { error: 401, message: "Email Already Exist" };
        }
        const user = new user_model_1.default({
            name,
            email,
            password: hashPassword,
        });
        const data = await user.save();
        return { data };
    }
    static async loginUser(req) {
        const { email, password } = req.body;
        const user = await user_model_1.default.findOne({ email });
        if (user) {
            const val = await bcrypt_1.default.compare(password, user.password);
            const payload = {
                id: user._id,
                email: user.email,
                name: user.name,
            };
            if (val) {
                const token = jsonwebtoken_1.default.sign(payload, secretKey, {
                    expiresIn: "1h",
                });
                return { token: token, data: payload };
            }
            else {
                return { status: 404, message: "Incorrect Password!" };
            }
        }
        else {
            return { message: "user not found" };
        }
    }
}
exports.default = UserService;
