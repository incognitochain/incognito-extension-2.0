import getReduxStore from "@redux/store/chrome-storage";
import { testModelAction } from "@/redux/test";

let reduxStore: any;

const initRdux = async () => {
  const { store } = await getReduxStore();
  reduxStore = store;
};

const testAction = async () => {
  reduxStore.dispatch(testModelAction());
};

initRdux();

export { testAction };
