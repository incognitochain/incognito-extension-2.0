export interface IThemeState {
  darkMode: boolean;
}

const initialState: IThemeState = {
  darkMode: true,
};

const reducer = (
  state = initialState,
  action: {
    type: string;
    payload: any;
  },
) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
