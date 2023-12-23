import { Request, Response } from "express";
import Reply from '../util/Reply';

class AuthController {
  login(req: Request, res: Response) {
    res.status(200).json(new Reply('Login successfully!', null));
  }
  register(req: Request, res: Response) {
    res.status(200).json(new Reply('Register successfully!', null));
  }
}

export default AuthController;
