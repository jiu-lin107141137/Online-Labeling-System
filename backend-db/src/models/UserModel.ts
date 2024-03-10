import DBConnection from "../DBConnection";

class UserModel extends DBConnection {
    public static async addUser(email: string, password: string) {
        // generate sql string
        let sql = `
            INSERT INTO table_name (column1, column2, column3...)
            VALUES (value1, value2, value3...);
        `;
        
        try {
            // let res = await this.executeInTransaction(sql, []);
            // return res;
        } catch(err) {
            throw err;
        }
    }
}

export default UserModel;