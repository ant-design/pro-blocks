import request from 'umi-request';

export async function fakeSubmitForm(params: any) {
  return request('/api/basicForm', {
    method: 'POST',
    data: params,
  });
}
