import { useBackground } from "@popup/context/background";
import { useCallAsync } from "@popup/utils/notifications";
// import { getPTokenList } from "@redux/token";
import React, { FunctionComponent } from "react";
// import { useDispatch } from "react-redux";
// import { AppThunkDispatch } from "@redux/store";

const withPToken = (WrappedComponent: FunctionComponent) => {
  return (props: any) => {
    React.useEffect(() => {
      // getTokensList();
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withPToken;
