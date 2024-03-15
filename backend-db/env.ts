import { createHash } from 'crypto';
import sql from 'mssql';

const dbConfig: sql.config = {
    user: 'Jason',
    password: '304421317742',
    server: '127.0.0.1', 
    database: 'OnlineLabelingSystemDB',
    connectionTimeout: 10000,
    requestTimeout: 10000,
    options: {
        trustedConnection: true,
        enableArithAbort: true,
        // instanceName: 'MySqlContainer',
        trustServerCertificate: true
    },
    port: 1433
}

const hashConfig = {
  salt: 'RxjYf7pd4VbAPWHfQpDfsHEqthVrk/SiqKcxuRZIqAg=',
  hashString: (msg: string) => {
      return createHash("sha256").update(msg+hashConfig.salt).digest("hex");
  }
}

const EXPIRES_IN = 20 * 60 * 1000;
const REFRESH_EXPIRES_IN = 24 * 60 * 60 * 1000;
const SECRET = "RxjYf7pd4VbAPWHfQpDfsHEqthVrk/SiqKcxuRZIqAg=";
const REFRESH_SECRET = "zGmhA4vJsbRSAO8JVSohapdBD/husbYA=sf9HqLa6cja";

const jwtConfig = {
  EXPRIRES_IN : EXPIRES_IN+"ms", 
  REFRESH_EXPIRES_IN: REFRESH_EXPIRES_IN+"ms",
  SECRET: SECRET,
  REFRESH_SECRET: REFRESH_SECRET,
}

export {
  dbConfig,
  hashConfig,
  jwtConfig,
};
