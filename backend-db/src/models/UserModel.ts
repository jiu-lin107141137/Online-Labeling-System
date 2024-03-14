import DBConnection from "../DBConnection";
import SqlParameter from "../util/SqlParameter";
import User from "../util/User";

class UserModel extends DBConnection {
  public static async addUser(email: string, password: string, name: string) {
    // generate sql string
    let sql = `
      INSERT INTO dbo.t_User (${User.columnMap.email}, ${User.columnMap.password}, ${User.columnMap.name})
      VALUES (@${User.columnMap.email}, @${User.columnMap.password}, @${User.columnMap.name});
    `;

    let paramList = [
      new SqlParameter(User.columnMap.email, User.columnType.email, email),
      new SqlParameter(User.columnMap.password, User.columnType.password, password),
      new SqlParameter(User.columnMap.name, User.columnType.name, name)
    ];
    
    try {
      let res = await this.executeInTransaction(sql, paramList);
      return 0;
    } catch(err) {
      throw err;
    }
  }

  public static async getDuplicate(email: string) {
    let sql = `
      SELECT COUNT(*) as user_count
      FROM dbo.t_User
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
}

export default UserModel;