import sql from 'mssql';

class User {
  // public userId: number|null;
  // public email: string|null;
  // public password: string|null;
  // public name: string|null;
  // public priority: number|null;
  // public classId: number|null;
  public static columnMap = {
    userId: 'user_id',
    email: 'email',
    password: 'password',
    name: 'name',
    priority: 'priority',
    classId: 'class_id'
  };
  public static columnType = {
    userId: sql.UniqueIdentifier,
    email: sql.NVarChar,
    password: sql.Char,
    name: sql.NVarChar,
    priority: sql.TinyInt,
    classId: sql.Int
  };

  public static isValidEmail(email: string): boolean {
    if(!email)
      return false;
    return !!email.match(/^\S+@\S+\.\S+$/) && email.length < 50;
  }

  public static isValidName(name: string): boolean {
    if(!name)
      return false;
    return name.length < 50;
  }

  public static isValidPassword(password: string): boolean {
    if(!password)
      return false;
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
