class Reply {
  public message: string = '';
  public data: any;

  public constructor(message: string, data: any) {
    this.message = message;
    this.data = data;
  }
}

export default Reply;
