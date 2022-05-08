import React from "react";

type Props = {
  children?: React.ReactNode;
};

export type BaseComponent<T = any> = React.FC<Props & T>;

export default BaseComponent;
