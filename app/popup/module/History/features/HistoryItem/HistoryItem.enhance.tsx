import React from "react";
import { compose } from "recompose";
import ErrorBoundary from "@components/ErrorBoundary";

interface IProps {}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps) => {
  return (
    <ErrorBoundary>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );
};

export default compose<IProps, any>(enhance);
