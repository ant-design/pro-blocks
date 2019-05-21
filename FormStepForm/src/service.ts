import request from 'umi-request';

export async function fakeSubmitForm(params) {
  return request('/api/BLOCK_NAME/forms', {
    method: 'POST',
    data: params,
  });
}
