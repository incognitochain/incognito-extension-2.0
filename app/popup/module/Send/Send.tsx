import React from "react";
import Header from "@components/Header";
import { SendForm } from "@module/Send/features";

const Send = React.memo(() => {
  return (
    <>
      <Header showBack={true} />
      <SendForm />
    </>
  );
});

export default Send;
