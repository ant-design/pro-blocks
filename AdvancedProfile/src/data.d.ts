export interface advancedoperation1 {
  key: string;
  type: string;
  name: string;
  status: string;
  updatedAt: string;
  memo: string;
}

export interface advancedoperation2 {
  key: string;
  type: string;
  name: string;
  status: string;
  updatedAt: string;
  memo: string;
}

export interface advancedoperation3 {
  key: string;
  type: string;
  name: string;
  status: string;
  updatedAt: string;
  memo: string;
}

export interface advancedprofiledata {
  advancedOperation1: AdvancedOperation1[];
  advancedOperation2: AdvancedOperation2[];
  advancedOperation3: AdvancedOperation3[];
}
