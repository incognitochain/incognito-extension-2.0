import BodyLayout from "@components/layout/BodyLayout";
import TextArea from "@popup/components/Inputs/TextArea";
import TextInput from "@popup/components/Inputs/TextInput";
import { trim } from "lodash";
import React, { useCallback, useLayoutEffect, useState, useRef, useEffect } from "react";
import {
  DescriptionText,
  MasterKeyNameLabel,
  MnemonicTextArea,
  PrimaryButtonContaniner,
  TextInputWraper,
} from "./ImportMasterKeyPage.styled";
import Header from "@components/Header";
const { validateMnemonic } = require("incognito-chain-web-js/build/web/wallet");

const NAME_PATTERN = /^[A-Za-z0-9]*$/;

interface ImportMasterKeyPageProps {
  masterKeyName?: string;
  mnemonic?: string;
  onBack?: () => void;
  continueOnClick?: (masterKeyName?: string, mnemonic?: string) => void;
}

export const ImportMasterKeyPage: React.FC<ImportMasterKeyPageProps> = (props: ImportMasterKeyPageProps) => {
  const {
    masterKeyName = "ABCDE",
    onBack = () => {},
    continueOnClick = () => {},
    mnemonic = "identify hollow edge tilt enrich actress radio february zone song host recycle",
  } = props;

  const masterKeyNameTextInput = useRef<any>(null);
  const phraseTextInput = useRef<any>(null);

  const [masterKeyNameLocal, setMasterKeyNameLocal] = useState("");
  const [mnemonicLocal, setMnemonicLocal] = useState("");

  const [errorVisible, setErrorVisible] = useState(false);
  const [mnemonicErrorVisible, setMnemonicErrorVisible] = useState(false);

  useLayoutEffect(() => {
    setMasterKeyNameLocal(masterKeyName);
    setMnemonicLocal(mnemonic);
  }, []);

  useEffect(() => {
    masterKeyNameTextInput.current && masterKeyNameTextInput.current.focus();
  }, []);

  const continueOnPress = () => {
    const trimmedName = trim(masterKeyNameLocal);
    const trimmedMnemonic = trim(mnemonicLocal);

    if (!NAME_PATTERN.test(masterKeyNameLocal)) {
      return setErrorVisible(true);
    }

    if (!validateMnemonic(trimmedMnemonic)) {
      return setMnemonicErrorVisible(true);
    }

    continueOnClick && continueOnClick(trimmedName, trimmedMnemonic);
  };

  const masterKeyOnChange = useCallback((e: any) => {
    setErrorVisible(false);
    setMasterKeyNameLocal(e.target.value);
  }, []);

  const mnemonicOnChange = useCallback((e: any) => {
    setMnemonicErrorVisible(false);
    setMnemonicLocal(e.target.value);
  }, []);
  // const continueButtonDisable = trim(masterKeyNameLocal || "").length === 0 || trim(mnemonicLocal || "").length === 0;

  return (
    <>
      <Header title="Master key" onGoBack={onBack} />
      <BodyLayout>
        <DescriptionText className="fs-regular fw-regular">{""}</DescriptionText>
        <MasterKeyNameLabel className="fs-small fw-regular">{"Master key name"}</MasterKeyNameLabel>
        <TextInputWraper>
          <TextInput
            refInput={masterKeyNameTextInput}
            value={masterKeyNameLocal}
            placeholder={"Enter a name for your master key"}
            onChange={masterKeyOnChange}
            errorEnable={errorVisible}
            errorText={"Master key names must be alphanumeric. Please choose another."}
            onKeyDown={(e) => {
              if (e.code.toLowerCase() === "enter") {
                masterKeyNameTextInput.current.blur();
                // phraseTextInput.current.focus();
                continueOnPress();
              }
            }}
          />
        </TextInputWraper>

        <MnemonicTextArea>
          <TextArea
            refInput={phraseTextInput}
            value={mnemonicLocal}
            placeholder={"12-word recovery phrase"}
            onChange={mnemonicOnChange}
            errorEnable={mnemonicErrorVisible}
            errorText={"Mnemonic words is invalid."}
            onKeyDown={(e) => {
              if (e.code.toLowerCase() === "enter") {
                continueOnPress();
                phraseTextInput.current.blur();
              }
            }}
          />
        </MnemonicTextArea>

        <PrimaryButtonContaniner onClick={continueOnPress} disabled={false}>
          {"Import master key"}
        </PrimaryButtonContaniner>
      </BodyLayout>
    </>
  );
};
