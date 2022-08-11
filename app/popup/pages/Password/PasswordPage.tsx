import BodyLayout from "@components/layout/BodyLayout";
import PasswordInput from "@popup/components/Inputs/PasswordInput";
import React, { useState, useLayoutEffect, useRef, useEffect } from "react";
import { DescriptionText, PasswordLabel, VerifyLabel, PrimaryButtonContaniner } from "./PasswordPage.styled";
import Header from "@components/Header";

let passwordValidator = require("password-validator");
let schema = new passwordValidator();

schema
  .is()
  .min(8, "password requires 8 characters minimum")
  .has()
  .not()
  .spaces(0, "The password should not have spaces");

export interface PasswordPageBaseProps {
  onBack?: () => void;
  headerTitle?: string;
  passwordInitValue?: string;
  descriptionText?: string;
  continuePressed?: (password: string) => void;
  buttonTitle?: string;
}

export const PasswordPage: React.FC<PasswordPageBaseProps> = (props: PasswordPageBaseProps) => {
  const {
    onBack = () => {},
    continuePressed = () => {},
    headerTitle = "",
    passwordInitValue = "buitanphat",
    descriptionText = "",
    buttonTitle = "Continue",
  } = props;

  const passwordTextInput = useRef<any>(null);
  const verifyTextInput = useRef<any>(null);

  const [password, setPassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");

  const [verify, setVerify] = useState<string>("");
  const [verifyPasswordError, setVerifyPasswordError] = useState("");

  useLayoutEffect(() => {
    setPassword(passwordInitValue);
    setVerify(passwordInitValue);
  }, []);

  useEffect(() => {
    passwordTextInput.current.focus();
  }, []);

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setPasswordErrorMessage("");
    setPassword(event.target.value);
  };

  const handleChangeVerify = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVerifyPasswordError("");
    setVerify(event.target.value);
  };

  const checkValid = (): boolean => {
    let checkValid = true;

    const passwordErrorList: any[] = schema.validate(password, { details: true }) || [];
    const verifyErrorList: any[] = schema.validate(verify, { details: true }) || [];

    // console.log("ERROR: ", {
    //   passwordErrorList,
    //   verifyErrorList,
    // });

    if (passwordErrorList.length > 0) {
      checkValid = false;
      setPasswordErrorMessage(passwordErrorList[0].message);
    }

    if (verifyErrorList.length > 0) {
      checkValid = false;
      setVerifyPasswordError(verifyErrorList[0].message);
    } else if (password.length !== verify.length || password !== verify) {
      checkValid = false;
      setVerifyPasswordError("Password and verify password does not match!");
    }

    return checkValid;
  };

  const continueOnClick = () => {
    if (checkValid()) {
      continuePressed(password);
    }
  };

  return (
    <>
      <Header title="Master key phrase" onGoBack={onBack} />
      <BodyLayout className="scroll-view">
        <DescriptionText className="fs-regular fw-regular">{descriptionText}</DescriptionText>
        <PasswordLabel className="fs-small fw-regular">{"Password"}</PasswordLabel>
        <PasswordInput
          refInput={passwordTextInput}
          value={password}
          placeholder={"Create password (min 10 chars)"}
          onChange={handleChangePassword}
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
          onChange={handleChangeVerify}
          errorEnable={true}
          errorText={verifyPasswordError}
          onKeyDown={(e) => {
            if (e.code.toLowerCase() === "enter") {
              continueOnClick();
            }
          }}
        />
        <PrimaryButtonContaniner onClick={continueOnClick}>{buttonTitle}</PrimaryButtonContaniner>
      </BodyLayout>
    </>
  );
};
