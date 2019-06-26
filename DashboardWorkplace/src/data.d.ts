export interface TagType {
  key: string;
  label: string;
}

export interface GeographicType {
  province: {
    label: string;
    key: string;
  };
  city: {
    label: string;
    key: string;
  };
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
export interface Member {
  avatar: string;
  name: string;
  id: string;
}

export interface ActivitiesType {
  id: string;
  updatedAt: string;
  user: {
    name: string;
    avatar: string;
  };
  group: {
    name: string;
    link: string;
  };
  project: {
    name: string;
    link: string;
  };

  template: string;
}

export interface RadarDataType {
  label: string;
  name: string;
  value: number;
}
