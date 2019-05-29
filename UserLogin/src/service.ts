import request from 'umi-request';
import { FromDataType } from './index';

export async function fakeAccountLogin(params: FromDataType) {
  return request('/api/account', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/captcha?mobile=${mobile}`);
}
