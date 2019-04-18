import request from 'umi-request';
import { FromDataType } from './index';

export async function fakeAccountLogin(params: FromDataType) {
  return request('/api/BLOCK_NAME/account', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/BLOCK_NAME/captcha?mobile=${mobile}`);
}
