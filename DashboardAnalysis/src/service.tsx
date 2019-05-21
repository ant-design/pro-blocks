import request from 'umi-request';

export async function fakeChartData() {
  return request('/api/BLOCK_NAME/fake_chart_data');
}
