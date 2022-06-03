import React from "react";
import Header from "@components/Header";
import { SendForm } from "@module/Send/features";
import enhance, { IMergeProps } from "./Send.enhance";

const Send = React.memo((props: IMergeProps & any) => {
  return (
    <>
      <Header showBack={true} />
      <SendForm {...props} />
    </>
  );
});

export default enhance(Send);
