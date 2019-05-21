import request from 'umi-request';

export async function queryFakeList(params: { count: number }) {
  return request(`/api/BLOCK_NAME/fake_list`, {
    params,
  });
}
