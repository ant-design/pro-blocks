import request from 'umi-request';

export async function queryCurrent() {
  return request('/api/currentUser');
}

export async function queryProvince() {
  return request('/api/province');
}

export async function queryCity(province: string) {
  return request(`/api/city/${province}`);
}

export async function query() {
  return request('/api/users');
}
