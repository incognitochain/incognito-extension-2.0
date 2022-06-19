import React from "react";
import { useDispatch } from "react-redux";
import { AppThunkDispatch } from "@redux/store";
import { actionFetchFee } from "@module/Send/Send.actions";

const enhance = (WrappedComponent: React.FunctionComponent) => (props: any) => {
  const dispatch: AppThunkDispatch = useDispatch();
  const handleFetchFee = () => dispatch(actionFetchFee());

  React.useEffect(() => {
    handleFetchFee().then();
  }, []);

  return <WrappedComponent {...props} />;
};

export default enhance;
