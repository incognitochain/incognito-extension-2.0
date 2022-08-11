export interface AppStateExample {
  status: any;
  isReady: boolean;
  test: any;
}

const initialState: AppStateExample = {
  status: {},
  isReady: false,
  test: {},
};

export const reducer = (state: AppStateExample = initialState, action: any = {}): AppStateExample => {
  switch (action.type) {
    case "TODO": {
      return { ...state, test: action.payload };
    }
    case "ABCDE": {
      return { ...state, test: Math.random().toFixed(3) };
    }
    default:
      return state;
  }
};
