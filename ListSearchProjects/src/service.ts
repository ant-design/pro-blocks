import request from 'umi-request';
import { Params, ListItemDataType } from 'ListSearchArticles/src/data';

export async function queryFakeList(
  params: Params,
): Promise<{ data: { list: ListItemDataType[] } }> {
  return request('/api/fake_list', {
    params,
  });
}
