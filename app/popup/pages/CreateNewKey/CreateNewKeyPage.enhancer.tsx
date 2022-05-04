import React from "react";

export const withEnhancer = <P extends object>(
  Component: React.ComponentType<P>,
): React.ComponentType<P> => (props) => {
  return <Component {...(props as P)} />;
};
