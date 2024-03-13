class Reply {
  public code: number = 400;
  public message: string = '';
  public data: any;
  public isExpired: boolean = false;

  public constructor(code: number, message: string, data: any, isExpired: boolean) {
    this.code = code;
    this.message = message;
    this.data = data;
    this.isExpired = isExpired;
  }
}

export default Reply;
