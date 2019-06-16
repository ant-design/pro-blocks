import request from 'umi-request';
import { ListItemDataType } from './data';

export async function queryFakeList(params: ListItemDataType) {
  return request('/api/fake_list', {
    params,
  });
}
