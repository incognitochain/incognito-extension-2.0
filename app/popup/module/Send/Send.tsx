import React from "react";
import Header from "@components/Header";
import { SendForm } from "@module/Send/features";
import enhance, { IMergeProps } from "./Send.enhance";
import { useSelector } from "react-redux";
import { sendDataSelector } from "@module/Send/Send.selector";

const Send = React.memo((props: IMergeProps & any) => {
  const { onGoBack } = props;
  const { headerTitle } = useSelector(sendDataSelector);
  return (
    <>
      <Header showBack={true} title={headerTitle} onGoBack={onGoBack} />
      <SendForm {...props} />
    </>
  );
});

export default enhance(Send);
