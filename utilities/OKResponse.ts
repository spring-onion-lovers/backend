/**
 * OKResponse class – a utility class for creating a standard response object
 */
export default class OKResponse {
  public message: string = 'OK';
  public statusCode: number = 200;
  public error: boolean = false;
  public data: unknown = {};

  constructor(
    data: unknown = {},
    message: string = 'OK',
    statusCode: number = 200,
  ) {
    this.data = data || {};
    this.data = data;
    this.message = message;
    this.statusCode = statusCode;
  }
}

export class OKResponsePaginated extends OKResponse {
  constructor(
    public data: unknown = {},
    public total_count: number,
    public page_count: number,
    public page: number,
  ) {
    super(data);
  }
}
