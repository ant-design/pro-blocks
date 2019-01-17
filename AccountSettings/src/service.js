import request from 'umi-request';

export async function queryCurrent() {
  return request('/api/BLOCK_NAME/currentUser');
}

export async function queryProvince() {
  return request('/api/BLOCK_NAME/province');
}

export async function queryCity(province) {
  return request(`/api/BLOCK_NAME/city/${province}`);
}

export async function query() {
  return request('/api/BLOCK_NAME/users');
}
