/* eslint-disable @typescript-eslint/no-var-requires */
const diffImage = require('block-screenshot/src/screenshot');
const path = require('path');

jest.setTimeout(50000000);
describe('Pro Block', () => {
  it('🥩 diff all block images', async () => {
    const diffFileList = await diffImage({
      cwd: path.join(__dirname, '../../'),
      diff: true,
    });
    expect(diffFileList.length).toBe(0);
  });
});
