import React, { createContext, useContext, useReducer } from 'react';

interface StepDataType {
  payAccount: string;
  receiverAccount: string;
  receiverName: string;
  amount: string;
}

interface StateType {
  current: string;
  step: StepDataType;
}

interface FormContextType {
  state: StateType;
  dispatch: ({ type, payload }: { type: string; payload?: any }) => void;
}

const initialState = {
  current: 'info',
  step: {
    payAccount: 'ant-design@alipay.com',
    receiverAccount: 'test@example.com',
    receiverName: 'Alex',
    amount: '500',
  },
};

// 创建 context
const FormContext = createContext<FormContextType>({
  state: initialState,
  dispatch: () => null,
});

function reducer(state: StateType, { type, payload }: { type: string; payload?: any }) {
  switch (type) {
    case 'saveCurrentStep':
      return { ...state, current: payload };
    case 'saveStepFormData':
      return { ...state, step: payload };
    default:
      throw new Error(`action ${type} does not exist!`);
  }
}

const FormStepProvider: React.FC<{}> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <FormContext.Provider value={{ state, dispatch }}>{children}</FormContext.Provider>;
};

export { FormStepProvider, FormContext };

export function useModel() {
  const {
    state: { current, step },
    dispatch,
  } = useContext(FormContext);

  function setCurrent(curr: string) {
    dispatch({ type: 'saveCurrentStep', payload: curr });
  }
  function setStepData(values: StepDataType) {
    dispatch({ type: 'saveStepFormData', payload: values });
  }

  return { current, setCurrent, step, setStepData };
}
