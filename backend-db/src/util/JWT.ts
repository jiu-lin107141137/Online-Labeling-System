import { jwtConfig } from "../../env";
import jwt from 'jsonwebtoken';

class JWT {
  public static signAccess(user: any) {
    let accessToken = jwt.sign(user, jwtConfig.SECRET, {
      expiresIn: jwtConfig.EXPRIRES_IN
    });
    return accessToken;
  }
  public static signRefresh(user: any) {
    let refreshToken = jwt.sign(user, jwtConfig.REFRESH_SECRET, {
      expiresIn: jwtConfig.REFRESH_EXPIRES_IN
    });
    return refreshToken;
  }
  public static async decode(token: string, isRefresh: boolean = false) {
    if(!token)
      return null;
    
    const decoded = jwt.verify(token, isRefresh ? jwtConfig.REFRESH_SECRET : jwtConfig.SECRET, (err, decode) => {
      if(err && err.name == 'TokenExpiredError')
        return -1;
      else if(err)
        return null;
      else
        return decode;
    });

    return decoded;
  }
}
/*
router.post('/manager', async(req, res, next) => {
    if(!req.body.token)
        res.status(403).json({
            message: 'Unauthorized',
            state: false
        });
    else {
        let decoded = await jwt_verify(req.body.token);

        if(decoded == -1)
            res.status(403).json({
                message: 'Unauthorized',
                expired: true,
                state: false
            });
        else if(!decoded || !decoded.Priority)
            res.status(403).json({
                message: 'Unauthorized',
                state: false
            });
        else if(decoded.Priority < 1)
            res.status(403).json({
                message: 'not enough priority',
                state: false
            });
        else
            res.status(200).json({
                message: 'successfully',
                state: true
            });
    }
})

*/

export default JWT;