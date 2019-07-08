/* eslint-disable @typescript-eslint/no-var-requires */
const diffImage = require('block-screenshot/src/screenshot');
const path = require('path');
const { winPath } = require('umi-utils');

jest.setTimeout(50000000);
describe('Pro Block', () => {
  it('🥩 diff all block images', async () => {
    const diffFileList = await diffImage({
      cwd: path.join(winPath(__dirname), '../../'),
      diff: true,
    });
    expect(diffFileList.length).toBe(0);
  });
});
