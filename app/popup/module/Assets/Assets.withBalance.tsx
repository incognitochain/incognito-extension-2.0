import React, { FunctionComponent } from "react";
import { useCallAsync } from "@popup/utils/notifications";
import { useBackground } from "@popup/context/background";

export const withBalance = (WrappedComponent: FunctionComponent) => (props: any) => {
  const callAsync = useCallAsync();
  const { request } = useBackground();
  const loadFollowTokensBalance = () => {
    callAsync(request("popup_followTokensBalance", {}), {
      progress: { message: "Loading Balance..." },
      success: { message: "Load Balance Done" },
      onSuccess: (result) => {
        console.log("SANG TEST ", result);
        // history.goBack();
      },
    }).then((result) => {
      console.log("SANG TEST ", result);
    });
  };

  React.useEffect(() => {
    setTimeout(() => {
      loadFollowTokensBalance();
    }, 2000);
  }, []);
  return <WrappedComponent {...props} />;
};
