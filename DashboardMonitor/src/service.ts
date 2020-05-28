import request from 'umi-request';
import { TagType } from './data';

export async function queryTags(): Promise<{ data: { list: TagType[]  } }> {
  return request('/api/tags');
}
