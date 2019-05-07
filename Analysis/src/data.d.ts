export interface ivisitdata {
  x: string;
  y: number;
}

export interface ivisitdata2 {
  x: string;
  y: number;
}

export interface isalesdata {
  x: string;
  y: number;
}

export interface isearchdata {
  index: number;
  keyword: string;
  count: number;
  range: number;
  status: number;
}

export interface iofflinedata {
  name: string;
  cvr: number;
}

export interface iofflinechartdata {
  x: any;
  y1: number;
  y2: number;
}

export interface isalestypedata {
  x: string;
  y: number;
}

export interface isalestypedataonline {
  x: string;
  y: number;
}

export interface isalestypedataoffline {
  x: string;
  y: number;
}

export interface iradardata {
  name: string;
  label: string;
  value: number;
}

export interface ianalysisdata {
  visitData: IVisitData[];
  visitData2: IVisitData2[];
  salesData: ISalesData[];
  searchData: ISearchData[];
  offlineData: IOfflineData[];
  offlineChartData: IOfflineChartData[];
  salesTypeData: ISalesTypeData[];
  salesTypeDataOnline: ISalesTypeDataOnline[];
  salesTypeDataOffline: ISalesTypeDataOffline[];
  radarData: IRadarData[];
}
