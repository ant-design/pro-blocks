export interface ITag {
  key: string;
  label: string;
}

export interface Province {
  label: string;
  key: string;
}

export interface City {
  label: string;
  key: string;
}

export interface Geographic {
  province: Province;
  city: City;
}
export interface ProvinceData {
  name: string;
  id: string;
}
export interface CityData {
  province: string;
  name: string;
  id: string;
}
export interface Notice {
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
