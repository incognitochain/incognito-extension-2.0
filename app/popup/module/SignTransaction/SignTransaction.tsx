import WrapContent from "@components/Content/Content";
import Header from "@components/Header";
import { useBackground } from "@popup/context/background";
import { useCallAsync } from "@popup/utils/notifications";
import React, { useCallback } from "react";
// import { useHistory } from "react-router-dom";
import { MainContent } from "./SignTransaction.styled";
import { throttle } from "lodash";
import { useLoading } from "@popup/context/loading";

const SignTransaction: React.FC = React.memo(() => {
  const { popupState, isNotification, request } = useBackground();
  const callAsync = useCallAsync();
  // const history = useHistory();
  const { showLoading } = useLoading();
  const action = popupState && popupState.actions && popupState.actions[0];

  const handleApprove = useCallback(
    throttle(async () => {
      console.log("handleApprove ... ");
      showLoading({
        value: true,
        message: "Loading...",
      });

      callAsync(
        request("popup_authoriseTransaction", {
          actionKey: action?.key,
        }),
        {
          progress: { message: "Authorizing Transaction..." },
          success: { message: "Success!" },
          onFinish: () => {
            showLoading({
              value: false,
            });
            setTimeout(() => {
              // TO DO
              window.close();
            }, 1000);
          },
        },
      );
    }, 2000),
    [],
  );

  const handleDecline = useCallback(
    throttle(() => {
      console.log("handleDecline ... ");
      callAsync(
        request("popup_declineTransaction", {
          actionKey: action?.key,
        }),
        {
          progress: { message: "Declining Transaction..." },
          success: { message: "Declined", variant: "error" },
          onFinish: () => {
            setTimeout(() => {
              // history.push(AssetsRoute);
              window.close();
            }, 1000);
          },
        },
      );
    }, 2000),
    [],
  );

  return (
    <>
      <Header title="Sign Transaction" showBack={false} />
      <WrapContent className="default-padding-horizontal default-padding-top">
        <MainContent>
          <div className="buttons-row">
            <p className="deline-button center hover-with-cursor" onClick={handleDecline}>
              Deline
            </p>
            <div className="space" />
            <p className="approve-button center hover-with-cursor" onClick={handleApprove}>
              Approve
            </p>
          </div>
        </MainContent>
      </WrapContent>
    </>
  );
});

export default SignTransaction;
