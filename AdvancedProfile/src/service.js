import request from 'umi-request';

export async function queryAdvancedProfile() {
  return request('/api/BLOCK_NAME/advanced');
}
