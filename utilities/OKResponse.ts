/**
 * OKResponse class – a utility class for creating a standard response object
 */
export default class OKResponse {
  public error: boolean = false;

  constructor(
    public data: unknown = {},
    public message: string = 'OK',
    public statusCode: number = 200,
  ) {}
}
