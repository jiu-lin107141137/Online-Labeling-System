import axios, { type AxiosInstance } from "axios";
import type Reply from "../util/Reply";
import { useInfoStore } from "@/stores";
import { useRouter } from "vue-router";
const { VITE_API_URL_DB, VITE_API_URL_FS } = process.env

let DBSConfig: AxiosInstance, FSSConfig: AxiosInstance;

class BaseAPI {
  protected static getDBSConfig() {
    if(DBSConfig == null) {
      DBSConfig = axios.create();
      DBSConfig.defaults.baseURL = VITE_API_URL_DB;
      DBSConfig.defaults.method = 'post';
    }
    return DBSConfig;
  }

  protected static getFSSConfig() {
    if(FSSConfig == null) {
      FSSConfig = axios.create();
      FSSConfig.defaults.baseURL = VITE_API_URL_FS;
      FSSConfig.defaults.method = 'post';
    }
    return FSSConfig;
  }

  protected static async refresh(): Promise<boolean> {    
    let axios = this.getDBSConfig();
    await axios({
      url: '/auth/refresh',
      data: {
        refreshToken: JSON.parse(window.sessionStorage.getItem('refreshToken') ?? '')?.content
      }
    }).then(res => {
      if(res.status != 200 || !res.data?.accessToken)
        throw {
          response: res
        };
      else {
        let token: string = res.data.accessToken;
        let infoStore = useInfoStore();
        window.sessionStorage.setItem('accessToken', JSON.stringify({ content: token }));
        infoStore.setAccessToken(token);
        return true;
      }
    }).catch(err => {
      return false;
    });
    return false;
  }

  private static logout(manual: boolean) {
    let infoStore = useInfoStore();
    let router = useRouter();
    infoStore.clearAll();
    window.sessionStorage.clear();
    window.localStorage.setItem('logout', Date.now().toString());
    if(manual)
      alert('You have logged out!');
    else
      alert('Token expired, please log in again!');
    router.push('/login');
  }

  public static async sendAPI<T extends (...args: any[]) => any> (func: T, ...args: Parameters<T>): Promise<Reply> {
    let res: Reply = await func(...args);
    if(res != null && res.isExpired) {
      let flag = await this.refresh();
      if(flag)
        res = await func(...args);
      else
        this.logout(false);
    }
    return res;
  }
}

export default BaseAPI;
