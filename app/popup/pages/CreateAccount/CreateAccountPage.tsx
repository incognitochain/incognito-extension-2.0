import Header from "@components/BaseComponent/Header";
import BodyLayout from "@components/layout/BodyLayout";
import TextInput from "@popup/components/Inputs/TextInput";
import { useBackground } from "@popup/context/background";
import { useLoading } from "@popup/context/loading";
import { useCallAsync } from "@popup/utils/notifications";
import { trim } from "lodash";
import React, { useCallback, useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { KeyChainLabel, PrimaryButtonContaniner, TextInputWraper } from "./CreateAccountPage.styled";
let accountNameValidator = require("password-validator");

let schema = new accountNameValidator();
var reg = /\w+$/i;

schema
  .is()
  .min(1, "Must be at least 1 characters")
  .max(50, "Must be 50 characters or less")
  .has()
  .not()
  .spaces(0, "Account name should not have spaces");

const CreateAccountPage: React.FC = () => {
  const keychainNameTextInput = useRef<any>(null);

  const history = useHistory();
  const callAsync = useCallAsync();
  const { request } = useBackground();
  const { showLoading } = useLoading();

  const [keychainName, setKeychainName] = useState("");
  const [keychainNameError, setKeychainNameError] = useState("");

  useEffect(() => {
    keychainNameTextInput.current.focus();
  }, []);

  const keychainOnChange = useCallback((e: any) => {
    setKeychainName(e.target.value);
    setKeychainNameError("");
  }, []);

  const onBack = () => {
    history.goBack();
  };

  const createKeychainOnPressed = () => {
    if (checkValid()) {
      showLoading({
        value: true,
      });
      callAsync(request("popup_createAccount", { accountName: trim(keychainName) }), {
        progress: { message: "Account Creating..." },
        success: { message: "Account Created" },
        onSuccess: (result) => {
          showLoading({
            value: false,
          });
          history.goBack();
        },
      });
    }
  };

  const checkValid = (): boolean => {
    let checkValid = true;

    const errorList: any[] = schema.validate(keychainName, { details: true }) || [];

    if (errorList.length > 0) {
      checkValid = false;
      setKeychainNameError(errorList[0].message);
    } else if (!keychainName.match(reg)) {
      checkValid = false;
      setKeychainNameError(`Please use a valid account name (Ex: "Cat, Account-1,..").`);
    }
    return checkValid;
  };

  return (
    <>
      <Header title="Create keychain" onBackClick={onBack} />
      <BodyLayout>
        <KeyChainLabel className="fs-regular fw-regular">{"Keychain name"}</KeyChainLabel>
        <TextInputWraper>
          <TextInput
            refInput={keychainNameTextInput}
            value={keychainName}
            placeholder={"Enter a keychain name"}
            onChange={keychainOnChange}
            errorEnable={keychainNameError.length > 0}
            errorText={keychainNameError}
            onKeyDown={(e) => {
              if (e.code.toLowerCase() === "enter") {
                createKeychainOnPressed();
              }
            }}
          />
        </TextInputWraper>

        <PrimaryButtonContaniner onClick={createKeychainOnPressed}>{"Create keychain"}</PrimaryButtonContaniner>
      </BodyLayout>
    </>
  );
};
export default CreateAccountPage;
