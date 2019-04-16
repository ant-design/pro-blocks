import request from 'umi-request';

export async function queryBasicProfile() {
  return request('/api/BLOCK_NAME/basic');
}
