import request from 'umi-request';

export async function queryFakeList(params) {
  return request('/api/BLOCK_NAME/fake_list', {
    params,
  });
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request('/api/BLOCK_NAME/fake_list', {
    method: 'POST',
    params: {
      count,
    },
    data: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request('/api/BLOCK_NAME/fake_list', {
    method: 'POST',
    params: {
      count,
    },
    data: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request('/api/BLOCK_NAME/fake_list', {
    method: 'POST',
    params: {
      count,
    },
    data: {
      ...restParams,
      method: 'update',
    },
  });
}
