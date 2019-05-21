export interface basicgood {
  id: string;
  name: string;
  barcode: string;
  price: string;
  num: string | number;
  amount: string | number;
}

export interface basicprogress {
  key: string;
  time: string;
  rate: string;
  status: string;
  operator: string;
  cost: string;
}

export interface basicprofiledatatype {
  basicGoods: BasicGood[];
  basicProgress: BasicProgress[];
}
