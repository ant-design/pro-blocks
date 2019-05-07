export interface itag {
  key: string;
  label: string;
}

export interface province {
  label: string;
  key: string;
}

export interface city {
  label: string;
  key: string;
}

export interface geographic {
  province: Province;
  city: City;
}
export interface provincedata {
  name: string;
  id: string;
}
export interface citydata {
  province: string;
  name: string;
  id: string;
}
export interface notice {
  id: string;
  title: string;
  logo: string;
  description: string;
  updatedAt: string;
  member: string;
  href: string;
  memberLink: string;
}

export interface currentuser {
  name: string;
  avatar: string;
  userid: string;
  notice: Notice[];
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
