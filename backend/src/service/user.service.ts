// src/services/UserService.ts
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

const secretKey = (process.env.SECRET_KEY as string) || "kkrish7654";



class UserService {
  static async userCreate(req: Request) {
    const { name, email, password } = req.body;

    const salt = 10;
    const hashPassword = await bcrypt.hash(password, salt);

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return { error: 401, message: "Email Already Exist" };
    }

    const user = new User({
      name,
      email,
      password: hashPassword,
    });

    const data = await user.save();

    return { data };
  }

  static async loginUser(req: Request) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      const val = await bcrypt.compare(password, user.password);

      const payload = {
        id: user._id,
        email: user.email,
        name: user.name,
      };

      if (val) {
        const token = jwt.sign(payload, secretKey, {
          expiresIn: "1h",
        });

        return { token: token, data: payload };
      } else {
        return { status: 404, message: "Incorrect Password!" };
      }
    } else {
      return { message: "user not found" };
    }
  }
}

export default UserService;
