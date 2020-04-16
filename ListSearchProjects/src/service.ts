import request from 'umi-request';
import { Params } from 'ListSearchArticles/src/data';

export async function queryFakeList(params: Params) {
  return request('/api/fake_list', {
    params,
  });
}
