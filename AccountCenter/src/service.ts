import request from 'umi-request';
import { CurrentUser, ListItemDataType } from './data.d';

export async function queryCurrent(): Promise<{ data: CurrentUser }> {
  return request('/api/currentUserDetail');
}

export async function queryFakeList(params: {
  count: number;
}): Promise<{ data: { list: Array<ListItemDataType> } }> {
  return request('/api/fake_list_Detail', {
    params,
  });
}
