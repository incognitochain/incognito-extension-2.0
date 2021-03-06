import BodyLayout from "@components/layout/BodyLayout";
import PasswordInput from "@popup/components/Inputs/PasswordInput";
import TextArea from "@popup/components/Inputs/TextArea";
import { useBackground } from "@popup/context/background";
import { useCallAsync } from "@popup/utils/notifications";
import { trim } from "lodash";
import React, { useCallback, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useLoading } from "@popup/context/loading";
import {
  DescriptionText,
  MnemonicTextArea,
  PasswordLabel,
  PrimaryButtonContaniner,
  VerifyLabel,
} from "./RestoreWalletPage.styled";
import { route as AssetsRoute } from "@module/Assets/Assets.route";
import Header from "@components/Header";

const { validateMnemonic } = require("incognito-chain-web-js/build/web/wallet");

let validator = require("password-validator");

let schema = new validator();

schema
  .is()
  .min(8, "password requires 8 characters minimum")
  .has()
  .not()
  .spaces(0, "The password should not have spaces");

const RestoreWalletPage: React.FC = () => {
  const phraseTextInput = useRef<any>(null);
  const passwordTextInput = useRef<any>(null);
  const verifyTextInput = useRef<any>(null);

  const history = useHistory();
  const callAsync = useCallAsync();
  const { request } = useBackground();
  const { showLoading } = useLoading();

  const [mnemonic, setMnemonic] = useState("");
  const [mnemonicError, setMnemonicError] = useState(false);

  const [password, setPassword] = useState<string>("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const [verify, setVerify] = useState<string>("");
  const [verifyErrorMessage, setVerifyErrorMessage] = useState("");

  const restoreWallet = async () => {
    showLoading({
      value: true,
      message: "Waiting...",
    });
    callAsync(request("popup_restoreWallet", { mnemonic: trim(mnemonic), password }), {
      progress: { message: "Restore Wallet..." },
      success: { message: "Restore Done" },
      onSuccess: (result: any) => {
        // history.push(Paths.homeRouteStack);
        showLoading({
          value: false,
        });
        history.push(AssetsRoute);
      },
    });
  };

  const onBack = () => {
    history.goBack();
  };

  const mnemonicOnChange = useCallback((e: any) => {
    setMnemonicError(false);
    setMnemonic(e.target.value);
  }, []);

  const passwordOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setPasswordErrorMessage("");
    setPassword(event.target.value);
  };

  const verifyOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setVerifyErrorMessage("");
    setVerify(event.target.value);
  };

  const restoreWalletOnPressed = () => {
    if (checkValid()) {
      restoreWallet();
    }
  };

  const checkValid = (): boolean => {
    let isValid = true;
    const trimmedMnemonic = trim(mnemonic);

    const passwordErrorList: any[] = schema.validate(password, { details: true }) || [];
    const verifyErrorList: any[] = schema.validate(verify, { details: true }) || [];

    if (passwordErrorList.length > 0) {
      isValid = false;
      setPasswordErrorMessage(passwordErrorList[0].message);
    }

    if (verifyErrorList.length > 0) {
      isValid = false;
      setVerifyErrorMessage(verifyErrorList[0].message);
    }

    if (password.length !== verify.length || password !== verify) {
      isValid = false;
      setVerifyErrorMessage("Password and verify password does not match!");
    }

    if (!validateMnemonic(trimmedMnemonic)) {
      isValid = false;
      setMnemonicError(true);
    }

    return isValid;
  };

  return (
    <>
      <Header title={"Reset Wallet"} onGoBack={onBack} />
      <BodyLayout className="scroll-view">
        <DescriptionText className="fs-regular fw-regular">
          {
            "Restore your wallet using your twelve seed words. Note that this will delete ALL existing keychains on this device."
          }
        </DescriptionText>

        <MnemonicTextArea>
          <TextArea
            refInput={phraseTextInput}
            value={mnemonic}
            placeholder={"12-word recovery phrase"}
            onChange={mnemonicOnChange}
            errorEnable={mnemonicError}
            errorText={"Mnemonic words is invalid."}
            onKeyDown={(e) => {
              if (e.code.toLowerCase() === "enter") {
                phraseTextInput.current.blur();
                passwordTextInput.current.focus();
              }
            }}
          />
        </MnemonicTextArea>

        <PasswordLabel className="fs-small fw-regular">{"Password"}</PasswordLabel>
        <PasswordInput
          refInput={passwordTextInput}
          value={password}
          placeholder={"Create password (min 10 chars)"}
          onChange={passwordOnChange}
          errorEnable={true}
          errorText={passwordErrorMessage}
          onKeyDown={(e) => {
            if (e.code.toLowerCase() === "enter") {
              passwordTextInput.current.blur();
              verifyTextInput.current.focus();
            }
          }}
        />
        <VerifyLabel className="fs-small fw-regular">{"Verify"}</VerifyLabel>
        <PasswordInput
          refInput={verifyTextInput}
          value={verify}
          placeholder={"Enter the password again"}
          onChange={verifyOnChange}
          errorEnable={true}
          errorText={verifyErrorMessage}
          onKeyDown={(e) => {
            if (e.code.toLowerCase() === "enter") {
              restoreWalletOnPressed();
            }
          }}
        />
        <PrimaryButtonContaniner onClick={restoreWalletOnPressed} disabled={false}>
          {"Restore"}
        </PrimaryButtonContaniner>
      </BodyLayout>
    </>
  );
};

export default RestoreWalletPage;
