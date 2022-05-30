import React, { FunctionComponent } from "react";
import { useCallAsync } from "@popup/utils/notifications";
import { useBackground } from "@popup/context/background";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export const withBalance = (WrappedComponent: FunctionComponent) => (props: any) => {
  const callAsync = useCallAsync();
  const { request } = useBackground();
  const loadFollowTokensBalance = () => {
    request("popup_followTokensBalance", {}).then(() => {
      console.log("HIHIHIHIHI");
    });
    // callAsync(request("popup_followTokensBalance", {}), {
    //   progress: { message: "Loading Balance..." },
    //   success: { message: "Load Balance Done" },
    //   onSuccess: (result) => {
    //     // history.goBack();
    //   },
    // });
  };

  React.useEffect(() => {
    loadFollowTokensBalance();
  }, []);
  return <WrappedComponent {...props} />;
};
