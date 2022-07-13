import React from "react";
import Header from "@components/Header";
import { SendForm } from "@module/Send/features";
import enhance, { IMergeProps } from "./Send.enhance";
import { useSelector } from "react-redux";
import { sendDataSelector } from "@module/Send/Send.selector";
import { ConfirmCreateTx } from "@module/Send/features/ConfirmCreateTx";

const Send = React.memo((props: IMergeProps & any) => {
  const { onGoBack } = props;
  const sendData = useSelector(sendDataSelector);
  const { headerTitle, isSend } = sendData;
  return (
    <>
      <Header showBack={true} title={headerTitle} onGoBack={onGoBack} />
      {isSend ? <SendForm {...props} /> : <ConfirmCreateTx {...props} />}
    </>
  );
});

export default enhance(Send);
