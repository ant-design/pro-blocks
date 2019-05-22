export interface ITag {
  key: string;
  label: string;
}

export interface IProvince {
  label: string;
  key: string;
}

export interface ICity {
  label: string;
  key: string;
}

export interface IGeographic {
  province: IProvince;
  city: ICity;
}

export interface INotice {
  id: string;
  title: string;
  logo: string;
  description: string;
  updatedAt: string;
  member: string;
  href: string;
  memberLink: string;
}

export interface CurrentUser {
  name: string;
  avatar: string;
  userid: string;
  notice: INotice[];
  email: string;
  signature: string;
  title: string;
  group: string;
  tags: ITag[];
  notifyCount: number;
  unreadCount: number;
  country: string;
  geographic: IGeographic;
  address: string;
  phone: string;
}

export interface Member {
  avatar: string;
  name: string;
  id: string;
}

export interface ListItemDataType {
  id: string;
  owner: string;
  title: string;
  avatar: string;
  cover: string;
  status: 'normal' | 'exception' | 'active' | 'success';
  percent: number;
  logo: string;
  href: string;
  body?: any;
  updatedAt: number;
  createdAt: number;
  subDescription: string;
  description: string;
  activeUser: number;
  newUser: number;
  star: number;
  like: number;
  message: number;
  content: string;
  members: Member[];
}
