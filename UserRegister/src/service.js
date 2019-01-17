import request from 'umi-request';

export async function fakeRegister(params) {
  return request('/api/BLOCK_NAME/register', {
    method: 'POST',
    data: params,
  });
}
