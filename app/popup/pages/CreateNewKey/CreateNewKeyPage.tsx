import BodyLayout from "@components/layout/BodyLayout";
import TextInput from "@popup/components/Inputs/TextInput";
import React, { useCallback, useLayoutEffect, useState } from "react";
import {
  ContentText1,
  ContentText2,
  MasterKeyNameText,
  RowCheckBox,
  TextInputWraper,
  CheckBoxDescription,
  PrimaryButtonContaniner,
} from "./CreateNewKeyPage.styled";
import Header from "@components/Header";
import CheckBox from "@popup/components/CheckBox/index";

const NAME_PATTERN = /^[A-Za-z0-9]*$/;

interface CreateNewKeyPageProps {
  masterKeyName?: string;
  onBack?: () => void;
  onReadyClick?: (masterKeyName?: string, checkBoxAccept?: boolean) => void;
  checkBoxAccept?: boolean;
}

export const CreateNewKeyPage: React.FC<CreateNewKeyPageProps> = (props: CreateNewKeyPageProps) => {
  const { masterKeyName = "", checkBoxAccept = false, onBack = () => {}, onReadyClick = () => {} } = props;

  const [masterKeyNameLocal, setMasterKeyNameLocal] = useState("");
  const [checkBoxAcceptLocal, setCheckBoxAcceptLocal] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);

  useLayoutEffect(() => {
    setMasterKeyNameLocal(masterKeyName);
    setCheckBoxAcceptLocal(checkBoxAccept);
  }, []);

  const readyOnClick = () => {
    if (!NAME_PATTERN.test(masterKeyNameLocal)) {
      return setErrorVisible(true);
    }
    onReadyClick && onReadyClick(masterKeyNameLocal, checkBoxAcceptLocal);
  };

  const masterKeyOnChange = useCallback((e: any) => {
    setErrorVisible(false);
    setMasterKeyNameLocal(e.target.value);
  }, []);

  const readyButtonDisable: boolean = !checkBoxAcceptLocal || !masterKeyNameLocal || masterKeyNameLocal.length < 0;
  return (
    <>
      <Header title="Create new key" onGoBack={onBack} />
      <BodyLayout className="scroll-view">
        <MasterKeyNameText className="fs-small  fw-regular">{"Master key name"}</MasterKeyNameText>
        <TextInputWraper>
          <TextInput
            value={masterKeyNameLocal}
            placeholder={"Enter a name for your master key"}
            onChange={masterKeyOnChange}
            errorEnable={errorVisible}
            errorText={"Master key names must be alphanumeric. Please choose another."}
            onKeyDown={(e) => {
              if (e.code.toLowerCase() === "enter") {
                if (!NAME_PATTERN.test(masterKeyNameLocal)) {
                  setErrorVisible(true);
                  return;
                }
                if (checkBoxAcceptLocal) {
                  onReadyClick && onReadyClick(masterKeyNameLocal, checkBoxAcceptLocal);
                }
              }
            }}
          />
        </TextInputWraper>
        <ContentText1 className="fs-regular fw-regular">
          {"The next screen will contain 12 special words that will allow you to recover your funds."}
        </ContentText1>
        <br />
        <ContentText2 className="fs-regular fw-regular">
          {
            "Be prepared to record them in a safe place. If anyone gains access to them, they will gain access to your funds."
          }
        </ContentText2>

        <RowCheckBox className="center">
          <CheckBox isActive={checkBoxAcceptLocal} onClicked={() => setCheckBoxAcceptLocal(!checkBoxAcceptLocal)} />
          <CheckBoxDescription
            className={`fs-regular fw-regular ${checkBoxAcceptLocal ? "activeColor" : "deactiveColor"}`}
          >
            {"I accept that if I lose these words I will lose access to my funds."}
          </CheckBoxDescription>
        </RowCheckBox>

        <PrimaryButtonContaniner onClick={readyOnClick} disabled={readyButtonDisable}>
          {"I'm ready"}
        </PrimaryButtonContaniner>
      </BodyLayout>
    </>
  );
};
