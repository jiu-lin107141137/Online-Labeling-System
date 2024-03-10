import sql from 'mssql';

class SqlParameter {
  public columnName: string;
  public type: any;
  public value: any;
  public constructor(columnName: string, type: any, value: any) {
    this.columnName = columnName;
    this.type = type;
    this.value = value;
  }
}

export default SqlParameter
