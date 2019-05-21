import request from 'umi-request';
import { TableListParams } from './data';

export async function queryRule(params: TableListParams) {
  return request(`/api/BLOCK_NAME`, {
    params,
  });
}

export async function removeRule(params: TableListParams) {
  return request('/api/BLOCK_NAME', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: TableListParams) {
  return request('/api/BLOCK_NAME', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/api/BLOCK_NAME', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
