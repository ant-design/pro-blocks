import Exception from './components/Exception';
import React from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import Link from 'umi/link';

const PAGE_NAME_UPPER_CAMEL_CASE: React.FC = () => (
  <Exception
    type="403"
    desc={formatMessage({ id:'BLOCK_NAME.description.403' })}
    linkElement={Link}
    backText={formatMessage({ id: 'BLOCK_NAME.description.back' })}
  />
);

export default PAGE_NAME_UPPER_CAMEL_CASE;
