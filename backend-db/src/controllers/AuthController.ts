import { Request, Response } from "express";
import Reply from '../util/Reply';
import User from "../util/User";
import UserModel from "../models/UserModel";
import { hashConfig } from "../../env";
import JWT from "../util/JWT";

class AuthController {
  async login(req: Request, res: Response) {
    let email = req.body?.email, password = req.body?.password;
    if(!User.isValidEmail(email) || !User.isValidPassword(password)) // validation
      res.status(400).json(new Reply(400, 'Invalid input format!', null, false));
    else {
      try {
        password = hashConfig.hashString(password);
        let rt = await UserModel.login(email, password);
        if(rt.length != 1)
          res.status(400).json(new Reply(
            400,
            'Wrong Email or password!',
            {
              'mismatch': true
            },
            false
          ));
        else {
          let accessToken = JWT.signAccess(rt[0]);
          let refreshToken = JWT.signRefresh(rt[0]);
          res.status(200).json(new Reply(
            200,
            'Login successfully',
            {
              user: rt[0],
              accessToken: accessToken,
              refreshToken: refreshToken
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
  async loginByToken(req: Request, res: Response) {
    let token = req.body?.token;
    if(token) {
      let decoded = await JWT.decode(token, true);
      if(!decoded || decoded == -1)
        res.status(400).json(new Reply(
          400,
          'Failed',
          false,
          false
        ));
      else {
        let user: any = decoded;
        delete user.iat;
        delete user.exp;
        let accessToken = JWT.signAccess(user);
        let refreshToken = JWT.signRefresh(user);
        res.status(200).json(new Reply(
          200,
          'Success',
          {
            accessToken: accessToken,
            refreshToken: refreshToken,
            user: user,
          },
          false
        ));
      }
    }
    else 
      res.status(400).json(new Reply(
        400,
        'Failed',
        false,
        false
      ));
  }
  async register(req: Request, res: Response) {
    let email = req.body?.email, password = req.body?.password, name = req.body?.name || email;
    if(!User.isValidEmail(email) || !User.isValidPassword(password) || !User.isValidName(name)) // validation
      res.status(400).json(new Reply(400, 'Invalid input format!', null, false));
    else {
      try {
        let count = await UserModel.getDuplicate(email);
        if(count == 0) { 
          password = hashConfig.hashString(password);
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
  async refresh(req: Request, res: Response) {
    let refreshToken = req.body?.refreshToken;
    let decoded = await JWT.decode(refreshToken, true);
    if(decoded == null || decoded == -1)
      res.status(403).json(new Reply(
        403,
        'Failed',
        null,
        false  
      ));
    else {
      let user: any = decoded;
      delete user.iat;
      delete user.exp;
      let accessToken = JWT.signAccess(user);
      res.status(200).json(new Reply(
        200,
        'Success',
        {
          accessToken: accessToken
        },
        false
      ));
    }
  }
  async verifyManager(req: Request, res: Response) {
    let accessToken = req.body?.accessToken;
    let decoded = await JWT.decode(accessToken, true);
    if(decoded == null)
      res.status(403).json(new Reply(
        403,
        'Unauthorized',
        false,
        false
      ));
    else {
      let user: any = decoded;
      if(user == -1)
        res.status(403).json(new Reply(
          403,
          'Expired',
          false,
          true
        ));
      else if(user.priority < 1)
        res.status(403).json(new Reply(
          403,
          'Not enough priority',
          false,
          false
        ));
      else
        res.status(200).json(new Reply(
          200,
          'Success',
          true,
          false
        ));
    }
  }
}

export default AuthController;
