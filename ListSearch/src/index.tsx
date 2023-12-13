import { PageContainer } from '@ant-design/pro-components';
import { Input } from 'antd';
import React from 'react';
import { history, useLocation, useMatch, useRouteData } from '@umijs/max';

type PAGE_NAME_UPPER_CAMEL_CASEProps = {
  match: {
    url: string;
    path: string;
  };
  location: {
    pathname: string;
  };
};

const tabList = [
  {
    key: 'articles',
    tab: '文章',
  },
  {
    key: 'projects',
    tab: '项目',
  },
  {
    key: 'applications',
    tab: '应用',
  },
];

const PAGE_NAME_UPPER_CAMEL_CASE = (
  props: React.PropsWithChildren<PAGE_NAME_UPPER_CAMEL_CASEProps>,
) => {
  const location = useLocation();
  const { route } = useRouteData();
  const match = useMatch(route.path!) as any;
  const handleTabChange = (key: string) => {
    const url = match?.path === '/' ? '' : match?.path;
    switch (key) {
      case 'articles':
        history.push(`${url}/articles`);
        break;
      case 'applications':
        history.push(`${url}/applications`);
        break;
      case 'projects':
        history.push(`${url}/projects`);
        break;
      default:
        break;
    }
  };

  const handleFormSubmit = (value: string) => {
    // eslint-disable-next-line no-console
    console.log(value);
  };

  const getTabKey = () => {
    const url = match?.path === '/' ? '' : match?.path;
    const tabKey = location.pathname.replace(`${url}/`, '');
    if (tabKey && tabKey !== '/') {
      return tabKey;
    }
    return 'articles';
  };

  return (
    <PageContainer
      content={
        <div style={{ textAlign: 'center' }}>
          <Input.Search
            placeholder="请输入"
            enterButton="搜索"
            size="large"
            onSearch={handleFormSubmit}
            style={{ maxWidth: 522, width: '100%' }}
          />
        </div>
      }
      tabList={tabList}
      tabActiveKey={getTabKey()}
      onTabChange={handleTabChange}
    >
      {props.children}
    </PageContainer>
  );
};

export default PAGE_NAME_UPPER_CAMEL_CASE;
