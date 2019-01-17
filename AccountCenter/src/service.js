import request from 'umi-request';

export async function query() {
  return request('/api/BLOCK_NAME/users');
}

export async function queryCurrent() {
  return request('/api/BLOCK_NAME/currentUser');
}
