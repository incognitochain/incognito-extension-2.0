import { getPTokenList } from "@redux/token";
import React, { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { AppThunkDispatch } from "@redux/store";

export const withStarted = (WrappedComponent: FunctionComponent) => {
  return (props: any) => {
    const dispatch: AppThunkDispatch = useDispatch();

    // TODO: REMOVE
    const getTokensList = () => dispatch(getPTokenList());

    React.useEffect(() => {
      getTokensList().then();
    }, []);

    return <WrappedComponent {...props} />;
  };
};
