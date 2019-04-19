import request from 'umi-request';
import { IUserRegisterParams } from './index';

export async function fakeRegister(params: IUserRegisterParams) {
  return request('/api/BLOCK_NAME/register', {
    method: 'POST',
    data: params,
  });
}
