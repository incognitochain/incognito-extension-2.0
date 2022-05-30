import React, { FunctionComponent } from "react";
import { useCallAsync } from "@popup/utils/notifications";
import { useBackground } from "@popup/context/background";

export const withBalance = (WrappedComponent: FunctionComponent) => (props: any) => {
  const callAsync = useCallAsync();
  const { request } = useBackground();
  const loadFollowTokensBalance = () => {
    callAsync(request("popup_followTokensBalance", {}), {}).then();
  };

  React.useEffect(() => {
    loadFollowTokensBalance();
  }, []);
  return <WrappedComponent {...props} />;
};
