import React from "react";

const enhance = (WrappedComponent: React.FunctionComponent) => (props: any) => {
  return <WrappedComponent {...props} />;
};

export default enhance;
