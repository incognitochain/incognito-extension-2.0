import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { appSelectors } from "../../redux/app/app.selectors";
const App1 = () => {
  const dispatch = useDispatch();
  const abc = useSelector(appSelectors);
  console.log("POPUP STATE abc: ", abc);
  return <div style={{ width: 800, height: 800, backgroundColor: "lightgrey" }}></div>;
};
export default App1;
