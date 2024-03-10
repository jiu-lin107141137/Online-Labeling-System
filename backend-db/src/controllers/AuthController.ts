import { Request, Response } from "express";
import Reply from '../util/Reply';
import User from "../util/User";
import UserModel from "../models/UserModel";

class AuthController {
  async login(req: Request, res: Response) {
    res.status(200).json(new Reply(200, 'Login successfully!', null));
  }
  async register(req: Request, res: Response) {
    let email = req.body.email, password = req.body.password;
    // if(!User.isValidEmail(email) || !User.isValidPassword(password))
    //   res.status(400).json(new Reply(400, 'Invalid input format!', null));
    // else {
    //   try {
        await UserModel.addUser(email, password);
    //   }
    //   catch(err) {
    //     console.log(err);
    //     res.status(500).json(new Reply(500, 'An internal error happened, please try again later!', null));
    //   }
    // }
  }
}

export default AuthController;
