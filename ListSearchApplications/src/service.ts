import request from 'umi-request';
import { Params } from './data.d';

export async function queryFakeList(params: Params) {
  return request('/api/fake_list', {
    params,
  });
}
