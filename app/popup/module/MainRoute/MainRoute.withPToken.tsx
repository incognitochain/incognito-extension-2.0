import { getPTokenList } from "@redux/token";
import React, { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { AppThunkDispatch } from "@redux/store";

const withPToken = (WrappedComponent: FunctionComponent) => {
  return (props: any) => {
    const dispatch: AppThunkDispatch = useDispatch();

    const getTokensList = () => dispatch(getPTokenList());

    React.useEffect(() => {
      // getTokensList().then();
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withPToken;
