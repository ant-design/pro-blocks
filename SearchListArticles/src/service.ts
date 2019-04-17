import request from 'umi-request';
import { ListItemDataType } from './data';

export async function queryFakeList(params: ListItemDataType) {
  return request(`/api/BLOCK_NAME/fake_list`, {
    params,
  });
}
