import axios, { type AxiosInstance } from "axios";
import type Reply from "../util/Reply";

let DBSConfig: AxiosInstance, FSSConfig: AxiosInstance;

class BaseAPI {
  protected static getDBSConfig() {
    if(DBSConfig == null) {
      DBSConfig = axios.create();
      DBSConfig.defaults.baseURL = 'http://127.0.0.1:3000';
      DBSConfig.defaults.method = 'post';
    }
    return DBSConfig;
  }

  protected static getFSSConfig() {
    if(FSSConfig == null) {
      FSSConfig = axios.create();
      FSSConfig.defaults.baseURL = 'http://127.0.0.1:5000';
      FSSConfig.defaults.method = 'post';
    }
    return FSSConfig;
  }

  protected static async refresh() {

  }

  protected static async sendAPI<T extends (...args: any[]) => any> (func: T, ...args: Parameters<T>): Promise<Reply> {
    let res: Reply = await func(...args);
    if(res.isExpired) {
      await this.refresh();
      res = await func(...args);
    }
    return res;
  }
}

export default BaseAPI;
