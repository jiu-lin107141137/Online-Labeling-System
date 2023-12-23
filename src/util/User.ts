class User {
  public memId: number;
  public email: string;
  public password?: string|null;
  public name: string = 'user';
  public priority: number = 0;
  public classId: number;

  public constructor(memId: number, email: string, password: string|null, name: string, priority: number, classId: number) {
    this.memId = memId;
    this.email = email;
    this.password = password;
    this.name = name;
    this.priority = priority;
    this.classId = classId;
  }
}

export default User;
