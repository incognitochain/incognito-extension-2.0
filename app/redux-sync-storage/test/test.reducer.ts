export interface Test {}

const initialState: Test = {};

export const reducer = (state: Test = initialState, action: any = {}): Test => {
  switch (action.type) {
    case "TEST_ACTION": {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};
