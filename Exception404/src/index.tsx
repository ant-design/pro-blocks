import Link from 'umi/link';
import React from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import Exception from './components/Exception';

export default () => (
  <Exception
    type="404"
    linkElement={Link}
    desc={formatMessage({ id: 'BLOCK_NAME.description.404' })}
    backText={formatMessage({ id: 'BLOCK_NAME.exception.back' })}
  />
);
