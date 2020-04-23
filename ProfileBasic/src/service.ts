import request from 'umi-request';
import { BasicGood, BasicProgress } from './data.d';

export async function queryBasicProfile(): Promise<{
  data: {
    basicProgress: BasicProgress[];
    basicGoods: BasicGood[];
  };
}> {
  return request('/api/profile/basic');
}
