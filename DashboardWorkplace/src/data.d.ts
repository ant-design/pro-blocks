export interface itag {
  key: string;
  label: string;
}

export interface iprovince {
  label: string;
  key: string;
}

export interface icity {
  label: string;
  key: string;
}

export interface geographic {
  province: IProvince;
  city: ICity;
}

export interface inotice {
  id: string;
  title: string;
  logo: string;
  description: string;
  updatedAt: string;
  member: string;
  href: string;
  memberLink: string;
}

export interface icurrentuser {
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
  geographic: Geographic;
  address: string;
  phone: string;
}

export interface imember {
  avatar: string;
  name: string;
  id: string;
}

export interface iactivities {
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

export interface iradardata {
  label: string;
  name: string;
  value: number;
}
