import axios, { type AxiosInstance } from "axios";
import type Reply from "../util/Reply";
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

  protected static async refresh() {

  }

  public static async sendAPI<T extends (...args: any[]) => any> (func: T, ...args: Parameters<T>): Promise<Reply> {
    let res: Reply = await func(...args);
    if(res != null && res.isExpired) {
      await this.refresh();
      res = await func(...args);
    }
    return res;
  }
}

export default BaseAPI;
