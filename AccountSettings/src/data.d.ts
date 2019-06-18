export interface TagType {
  key: string;
  label: string;
}

export interface ProvinceType {
  label: string;
  key: string;
}

export interface CityType {
  label: string;
  key: string;
}

export interface GeographicType {
  province: ProvinceType;
  city: CityType;
}

export interface NoticeType {
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
  notice: NoticeType[];
  email: string;
  signature: string;
  title: string;
  group: string;
  tags: TagType[];
  notifyCount: number;
  unreadCount: number;
  country: string;
  geographic: GeographicType;
  address: string;
  phone: string;
}
