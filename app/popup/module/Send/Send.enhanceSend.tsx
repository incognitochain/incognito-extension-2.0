import React from "react";
import { ISendFormData } from "./Send.types";

export interface TInner {
  handleSendAnonymously: (payload: ISendFormData) => any;
}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: any) => {
  const handleSendAnonymously = async (values: ISendFormData) => {
    try {
      // Handle send
    } catch (error) {
      // send fail
      throw error;
    }
  };
  return <WrappedComponent {...{ ...props, handleSendAnonymously }} />;
};

export default enhance;
