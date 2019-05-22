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

export interface ICurrentUser {
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
export interface IMember {
  avatar: string;
  name: string;
  id: string;
}

export interface IActivities {
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

export interface IRadarData {
  label: string;
  name: string;
  value: number;
}
