export interface tablelistitem {
  key: number;
  disabled?: boolean;
  href: string;
  avatar: string;
  name: string;
  title: string;
  owner: string;
  desc: string;
  callNo: number;
  status: number;
  updatedAt: Date;
  createdAt: Date;
  progress: number;
}

export interface tablelistpagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface tablelistdate {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface tablelistparams {
  sorter: string;
  status: string;
  name: string;
  pageSize: number;
  currentPage: number;
}
