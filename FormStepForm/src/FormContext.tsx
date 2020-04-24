import { createContext } from 'react';

export interface StateType {
  current: string;
  step: {
    payAccount: string;
    receiverAccount: string;
    receiverName: string;
    amount: string;
  };
}

interface FormContextType {
  state: StateType;
  dispatch: ({ type, payload }: { type: string; payload?: any }) => void;
}

const defaultValue: FormContextType = {
  state: {
    current: 'info',
    step: {
      payAccount: 'ant-design@alipay.com',
      receiverAccount: 'test@example.com',
      receiverName: 'Alex',
      amount: '500',
    },
  },
  dispatch: () => {},
};
// 创建 context
export const FormContext = createContext<FormContextType>(defaultValue);
