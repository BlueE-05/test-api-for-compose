import { Request, Response } from "express";
import { AuthService } from "../services/auth";

export const AuthController = {
  async login(req: Request, res: Response) {
    const { username, password } = req.body;
    const result = await AuthService.authenticateUser(username, password);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  },
};
