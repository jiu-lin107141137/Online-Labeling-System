import { dbConfig } from '../env';
import sql from 'mssql';
import SqlParameter from './util/SqlParameter';

class DBConnection {
  static pool: sql.ConnectionPool;
  private static async checkPool() {
    if(!this.pool)
      this.pool = await sql.connect(dbConfig);
  }
  protected static async execute(command: string, params: Array<SqlParameter>): Promise<sql.IResult<any>> {
    await this.checkPool();
    try {
      const request = this.pool.request();
      for(const param of params)
        request.input(param.columnName, param.type, param.value);
      let result = await request.query(command);
      return result;
    }
    catch(err) {
      throw err;
    }
  }
  protected static async executeInTransaction(command: string, params: Array<SqlParameter>): Promise<sql.IResult<any>> {
    await this.checkPool();
    const transaction: sql.Transaction = new sql.Transaction(this.pool);
    try {
      await transaction.begin();
      const request = new sql.Request(transaction);
      for(const param of params)
        request.input(param.columnName, param.type, param.value);
      let result = await request.query(command);
      await transaction.commit();
      return result;
    }
    catch (err) {
      transaction.rollback();
      throw err;
    }
  }
}

export default DBConnection;
