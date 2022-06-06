import { MainLayout } from "@popup/components/layout/MainLayout";
import PasswordInput from "@popup/components/Inputs/PasswordInput";
import { Paths } from "@popup/components/routes/paths";
import { useBackground } from "@popup/context/background";
import { useCallAsync } from "@popup/utils/notifications";
import { checkPasswordValid } from "@services/wallet/passwordService";
import { throttle } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useLoading } from "@popup/context/loading";

import {
  CircleImageStyled,
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

  useEffect(() => {}, []);

  return (
    <MainLayout>
      <CircleImageStyled />
      <Title>Welcome back</Title>
      <PasswordText>Password</PasswordText>
      <PasswordInput
        value={password}
        onChange={handleChangePassword}
        errorEnable={true}
        errorText={passwordErrorMessage}
      />
      <PrimaryButtonContaniner onClick={unLockOnClick} disabled={false}>
        Go incognito
      </PrimaryButtonContaniner>
      <ForgotYourPasswordStyled
        className="cursor"
        onClick={() => {
          history.push(Paths.restoreWalletPage);
        }}
      >
        Forgot your password?
      </ForgotYourPasswordStyled>
    </MainLayout>
  );
};

export default UnlockPageBase;
