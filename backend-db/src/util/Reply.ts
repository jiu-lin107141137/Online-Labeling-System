class Reply {
  public code: number = 400;
  public message: string = '';
  public data: any;

  public constructor(code: number, message: string, data: any) {
    this.code = code;
    this.message = message;
    this.data = data;
  }
}

export default Reply;
