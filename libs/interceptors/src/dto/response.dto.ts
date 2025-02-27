export interface CustomResponse<T = any> {
  statusCode: string;
  success: boolean;
  message: string;
  data: T;
}
