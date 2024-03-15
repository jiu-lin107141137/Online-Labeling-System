import Reply from "../util/Reply";
import BaseAPI from "./BaseAPI";

class UserAPI extends BaseAPI {
  public static async register(email: string, password: string, name: string): Promise<Reply|null> {
    let axios = super.getDBSConfig();
    let rt: Reply|null = null;
    await axios({
      url: '/auth/register',
      data: {
        email: email,
        password: password,
        name: name
      }
    }).then(res => {
      if(res.status != 200)
        throw {
          response: res
        };
      else
        rt = res.data;
    }).catch(err => {
      console.log(err);
      rt = err.response?.data;
    });
    return rt;
  }

  public static async login(email: string, password: string): Promise<Reply|null> {
    let axios = super.getDBSConfig();
    console.log(axios.defaults.baseURL);
    let rt: Reply|null = null;
    await axios({
      url: '/auth/login',
      data: {
        email: email,
        password: password,
      }
    }).then(res => {
      if(res.status != 200)
        throw {
          response: res
        };
      else
        rt = res.data;
    }).catch(err => {
      console.log(err);
      rt = err.response?.data;
    });
    return rt;
  }
}

export default UserAPI;
