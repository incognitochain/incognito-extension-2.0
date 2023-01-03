import BodyLayout from "@components/layout/BodyLayout";
import TextInput from "@popup/components/Inputs/TextInput";
import { useBackground } from "@popup/context/background";
import { useLoading } from "@popup/context/loading";
import { useCallAsync } from "@popup/utils/notifications";
import { trim } from "lodash";
import React, { useCallback, useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { KeyChainLabel, PrimaryButtonContaniner, TextInputWraper } from "./styles";
import Header from "@components/Header";
import { useSelector } from "react-redux";
// import { listAccountSelector } from "@redux/account/account.selectors";
import { getAccountListSelector } from "@redux-sync-storage/account/account.selectors";
import { AccountInfo } from "@redux-sync-storage/account/account.types";

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

const ImportKeyChainPage: React.FC = () => {
  const keychainNameTextInput = useRef<any>(null);
  const privateKeyTextInput = useRef<any>(null);

  const history = useHistory();
  const callAsync = useCallAsync();
  const { request } = useBackground();
  const { showLoading } = useLoading();

  const [keychainName, setKeychainName] = useState("");
  const [keychainNameError, setKeychainNameError] = useState("");

  const [privateKey, setPrviateKey] = useState("");
  const [privateKeyError, setPrivateKeyError] = useState("");

  // const listAccount = useSelector(listAccountSelector);
  // const listAccountName = listAccount.map((acc) => acc.AccountName || acc.name) || [];

  const listAccount: AccountInfo[] = useSelector(getAccountListSelector);
  const listAccountName = listAccount.map((acc) => acc.name) || [];

  useEffect(() => {
    keychainNameTextInput.current.focus();

    // setTimeout(() => {
    //   callAsync(request("popup_importKeyChain", { accountName: accountName_HARD, privateKey: prviateKey_HARD }), {
    //     progress: { message: "Import KeyChain..." },
    //     success: { message: "Import KeyChain DONE" },
    //     onSuccess: (result) => {
    //       showLoading({
    //         value: false,
    //       });
    //       history.goBack();
    //     },
    //   });
    // }, 5000);
  }, []);

  const keychainOnChange = useCallback((e: any) => {
    setKeychainName(e.target.value);
    setKeychainNameError("");
  }, []);

  const privateKeyOnChange = useCallback((e: any) => {
    setPrviateKey(e.target.value);
    setPrivateKeyError("");
  }, []);

  const onBack = () => {
    history.goBack();
  };

  const createKeychainOnPressed = () => {
    if (checkValid()) {
      showLoading({
        value: true,
      });
      callAsync(request("popup_importKeyChain", { accountName: trim(keychainName), privateKey: trim(privateKey) }), {
        progress: { message: "Import KeyChain..." },
        success: { message: "Done" },
        onSuccess: (result) => {
          showLoading({
            value: false,
          });
          history.goBack();
        },
        onError: (error: any) => {
          showLoading({
            value: false,
          });
          const originalError = error.data?.originalError;
          if (originalError) {
            // console.log("originalError ", originalError)
            const { field, message, description, code } = originalError;
            if (field === "privateKeyField" || code === -2005) {
              setPrivateKeyError( message || description || "Something went wrong. Please try again.");
            } else {
              setKeychainNameError(message);
            }
          }
        },
      });
    }
  };

  const checkValid = (): boolean => {
    let checkValid = true;
    let name = trim(keychainName);
    let privateKeyTrim = trim(privateKey) || "";

    console.log("CHECK>?> ", {
      name,
      privateKeyTrim,
    });
    const errorList: any[] = schema.validate(name, { details: true }) || [];

    console.log("errorList ", errorList);

    if (errorList.length > 0) {
      checkValid = false;
      setKeychainNameError(errorList[0].message);
    } else if (!name.match(reg)) {
      checkValid = false;
      setKeychainNameError(`Please use a valid account name (Ex: "Cat, Account-1,..").`);
    } else {
      const isAccountExist = listAccountName.find((accName) => accName === name);
      if (isAccountExist) {
        checkValid = false;
        setKeychainNameError(`You already have a keychain with this name. Please try another.`);
      }
    }

    if (privateKeyTrim && privateKeyTrim.length < 1) {
      checkValid = false;
      setPrivateKeyError("Required");
    }
    return checkValid;
  };

  return (
    <>
      <Header title="Import a Keychain" onGoBack={onBack} />
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
        <KeyChainLabel className="fs-regular fw-regular">{"Private Key"}</KeyChainLabel>
        <TextInputWraper>
          <TextInput
            refInput={privateKeyTextInput}
            value={privateKey}
            placeholder={"Enter private key"}
            onChange={privateKeyOnChange}
            errorEnable={privateKeyError.length > 0}
            errorText={privateKeyError}
            onKeyDown={(e) => {}}
          />
        </TextInputWraper>

        <PrimaryButtonContaniner onClick={createKeychainOnPressed}>{"Import"}</PrimaryButtonContaniner>
      </BodyLayout>
    </>
  );
};
export default ImportKeyChainPage;
