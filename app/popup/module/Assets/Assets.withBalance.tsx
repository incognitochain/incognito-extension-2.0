import React, { FunctionComponent } from "react";
import { useBackground } from "@popup/context/background";
import { useSelector } from "react-redux";
import { otaKeyOfDefaultAccountSelector } from "@redux/account/account.selectors";

export const withBalance = (WrappedComponent: FunctionComponent) => (props: any) => {
  const { request } = useBackground();
  const OTAKey = useSelector(otaKeyOfDefaultAccountSelector);
  const loadFollowTokensBalance = () => request("popup_followTokensBalance", {});

  React.useEffect(() => {
    loadFollowTokensBalance().then();
  }, [OTAKey]);
  return <WrappedComponent {...props} />;
};
