import { dbConfig } from '../env';
import sql from 'mssql';

class DBConnection {
  protected pool: sql.ConnectionPool;
  public constructor(pool: sql.ConnectionPool) {
    this.pool = pool;
  }
  public static async init(): Promise<DBConnection> {
    let pool: sql.ConnectionPool = await sql.connect(dbConfig);
    return new DBConnection(pool);
  }
}

export default DBConnection;
