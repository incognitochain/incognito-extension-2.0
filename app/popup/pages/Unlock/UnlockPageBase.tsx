import { MainLayout } from "@popup/components/layout/MainLayout";
import PasswordInput from "@popup/components/Inputs/PasswordInput";
import { Paths } from "@popup/components/routes/paths";
import { useBackground } from "@popup/context/background";
import { useCallAsync } from "@popup/utils/notifications";
import { checkPasswordValid } from "@services/wallet/passwordService";
import { throttle } from "lodash";
import React, { useCallback, useState, useLayoutEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useLoading } from "@popup/context/loading";
import CircleIcon from "@components/Icons/CircleIcon";

import {
  CircleIconContainer,
  ForgotYourPasswordStyled,
  PasswordText,
  PrimaryButtonContaniner,
  Title,
} from "./UnlockPage.styled";
import { route as AssetsRoute } from "@module/Assets/Assets.route";

export const UnlockPageBase: React.FC = () => {
  const history = useHistory();
  const callAsync = useCallAsync();
  const { request } = useBackground();
  const { showLoading } = useLoading();

  const passwordTextInput = useRef<any>(null);
  const [password, setPassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");
  const unLockOnClick = useCallback(
    throttle(async () => {
      try {
        const passWordValid = await checkPasswordValid(password);
        if (passWordValid) {
          showLoading({
            value: true,
            message: "Loading...",
          });
          callAsync(request("popup_unlockWallet", { password }), {
            progress: { message: "Unlocking wallet..." },
            success: { message: "Wallet unlocked" },
            onSuccess: () => {
              showLoading({
                value: false,
              });
              history.push(AssetsRoute);
            },
          });
        }
      } catch (error) {
        if (typeof error === "object") {
          setPasswordErrorMessage(error?.message);
        }
      }
    }, 2000),
    [password],
  );

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setPasswordErrorMessage("");
    setPassword(event.target.value);
  };

  useLayoutEffect(() => {
    passwordTextInput.current.focus();
  }, []);

  return (
    <MainLayout>
      <CircleIconContainer>
        <CircleIcon />
      </CircleIconContainer>
      <Title className="fs-large fw-medium">{"Welcome back"}</Title>
      <PasswordText className="fs-small fw-regular">{"Password"}</PasswordText>
      <PasswordInput
        refInput={passwordTextInput}
        value={password}
        onChange={handleChangePassword}
        errorEnable={true}
        errorText={passwordErrorMessage}
        onKeyDown={(e) => {
          if (e.code.toLowerCase() === "enter") {
            unLockOnClick();
          }
        }}
      />
      <PrimaryButtonContaniner onClick={unLockOnClick}>{"Go incognito"}</PrimaryButtonContaniner>
      <ForgotYourPasswordStyled
        className="cursor fs-regular fw-regular"
        onClick={() => {
          history.push(Paths.restoreWalletPage);
        }}
      >
        {"Forgot your password?"}
      </ForgotYourPasswordStyled>
    </MainLayout>
  );
};

export default UnlockPageBase;
