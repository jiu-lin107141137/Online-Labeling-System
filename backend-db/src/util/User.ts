import sql from 'mssql';

class User {
  // public userId: number|null;
  // public email: string|null;
  // public password: string|null;
  // public name: string|null;
  // public priority: number|null;
  // public classId: number|null;
  public static columnMap = {
    userId: 'UserId',
    email: 'Email',
    password: 'Password',
    name: 'Name',
    priority: 'Priority',
    classId: 'ClassId'
  };
  public static columnType = {
    userId: sql.Int,
    email: sql.NVarChar,
    password: sql.NVarChar,
    name: sql.NVarChar,
    priority: sql.TinyInt,
    classId: sql.Int
  };

  public static isValidEmail(email: string): boolean {
      return !!email.match(/^\S+@\S+\.\S+$/)
  }

  public static isValidPassword(password: string): boolean {
      return !!password.match(/^[0-9A-Za-z]+$/) && password.length >= 8 && password.length <= 20;
  }
  // public constructor(userId: number|null, email: string|null, password: string|null, name: string|null, priority: number|null, classId: number|null) {
  //   this.userId = userId;
  //   this.email = email;
  //   this.password = password;
  //   this.name = name;
  //   this.priority = priority;
  //   this.classId = classId;
  // }
}
export default User;
