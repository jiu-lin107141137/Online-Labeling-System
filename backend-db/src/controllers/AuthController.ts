import { Request, Response } from "express";
import Reply from '../util/Reply';
import User from "../util/User";
import UserModel from "../models/UserModel";

class AuthController {
  async login(req: Request, res: Response) {
    res.status(200).json(new Reply(200, 'Login successfully!', null, false));
  }
  async register(req: Request, res: Response) {
    let email = req.body?.email, password = req.body?.password, name = req.body?.name || email;
    if(!User.isValidEmail(email) || !User.isValidPassword(password) || !User.isValidName(name)) // validation
      res.status(400).json(new Reply(400, 'Invalid input format!', null, false));
    else {
      try {
        let count = await UserModel.getDuplicate(email);
        if(count == 0) { 
          await UserModel.addUser(email, password, name);
          res.status(200).json(new Reply(
            200,
            'Register successfully',
            null,
            false
          ));
        }
        else { // found duplicate data
          res.status(400).json(new Reply(
            400,
            'The email had been used!',
            {
              duplicate: true,
            },
            false
          ));
        }
      }
      catch(err) {
        console.log(err);
        res.status(500).json(new Reply(500, 'An internal error happened, please try again later!', null, false));
      }
    }
  }
}

export default AuthController;
