import { SetMetadata } from '@nestjs/common';

export const CUSTOM_RESPONSE = 'customResponse';

export interface CustomResponseOptions {
  message: string;
  statusCode: string;
}

export const CustomResponse = (options: CustomResponseOptions) => SetMetadata(CUSTOM_RESPONSE, options);
