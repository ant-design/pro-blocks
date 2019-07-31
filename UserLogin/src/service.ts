import request from 'umi-request';
import { FormDataType } from './index';

export async function fakeLoginAccount(params: FormDataType) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function fakeLoginMobile(params: FormDataType) {
  return request('/api/login/mobile', {
    method: 'POST',
    data: params,
  });
}

export async function fakeGetCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
