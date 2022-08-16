import { RootState } from "@redux/reducers";
import { People } from "./test.reducer";

export const peopleSelectors = (state: RootState): People | undefined => state.test.people;
