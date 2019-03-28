import request from 'umi-request';

export async function queryCurrent() {
  return request('/api/BLOCK_NAME/currentUser');
}
