import DBConnection from "../DBConnection";
import SqlParameter from "../util/SqlParameter";
import User from "../util/User";

class UserModel extends DBConnection {
  public static async addUser(email: string, password: string, name: string) {
    // generate sql string
    let sql = `
      INSERT INTO ${User.tableName} (${User.columnMap.email}, ${User.columnMap.password}, ${User.columnMap.name})
      VALUES (@${User.columnMap.email}, @${User.columnMap.password}, @${User.columnMap.name});
    `;

    let paramList = [
      new SqlParameter(User.columnMap.email, User.columnType.email, email),
      new SqlParameter(User.columnMap.password, User.columnType.password, password),
      new SqlParameter(User.columnMap.name, User.columnType.name, name)
    ];
    
    try {
      let res = await this.executeInTransaction(sql, paramList);
      return res;
    } catch(err) {
      throw err;
    }
  }

  public static async getDuplicate(email: string) {
    let sql = `
      SELECT COUNT(*) as user_count
      FROM ${User.tableName}
      WHERE ${User.columnMap.email}=@${User.columnMap.email}
    `;
    
    let paramList = [
      new SqlParameter(User.columnMap.email, User.columnType.email, email)
    ];

    try {
      let res = (await this.executeInTransaction(sql, paramList)).recordset[0]['user_count'];
      return res;
    } catch(err) {
      throw err;
    }
  }

  public static async login(email: string, password: string) {
    // generate sql string
    let sql = `
      SELECT ${User.columnMap.userId}, ${User.columnMap.email}, ${User.columnMap.name}, ${User.columnMap.priority}, ${User.columnMap.classId}
      FROM ${User.tableName}
      WHERE ${User.columnMap.email}=@${User.columnMap.email} AND ${User.columnMap.password}=@${User.columnMap.password}
    `;

    let paramList = [
      new SqlParameter(User.columnMap.email, User.columnType.email, email),
      new SqlParameter(User.columnMap.password, User.columnType.password, password),
    ];
    
    try {
      let res = (await this.executeInTransaction(sql, paramList)).recordset;
      return res;
    } catch(err) {
      throw err;
    }
  }
}

export default UserModel;