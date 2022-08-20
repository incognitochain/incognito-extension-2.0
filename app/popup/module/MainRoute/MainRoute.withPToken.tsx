import { useBackground } from "@popup/context/background";
// import { getPTokenList } from "@redux/token";
import React, { FunctionComponent } from "react";
// import { useDispatch } from "react-redux";
// import { AppThunkDispatch } from "@redux/store";

const withPToken = (WrappedComponent: FunctionComponent) => {
  return (props: any) => {
    const { request } = useBackground();
    // const dispatch = useDispatch();
    // const getTokensList = async () => dispatch(getPTokenList());
    const getTokensList = async () => {
      request("popup_getPTokenList", {}).catch((err) => {
        console.log("popup_getPTokenList %O", err);
      });
    };
    React.useEffect(() => {
      getTokensList();
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withPToken;
