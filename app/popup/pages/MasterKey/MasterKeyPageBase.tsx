import { BookmarkIcon } from "@popup/components/Icons";
import BodyLayout from "@components/layout/BodyLayout";
import MnemonicItem from "@components/Mnemonic/MnemonicItem";
import React, { useLayoutEffect, useState } from "react";
import {
  BookMarkContainer,
  BookMarkText,
  CopyButtonContainer,
  CopyButton,
  CopyText,
  MnemoicBox,
  MnemonicItemWrapper,
  PrimaryButtonContaniner,
  YellowBox,
} from "./MasterKeyPage.styled";
import copy from "copy-to-clipboard";
import { useSnackbar } from "notistack";
import Header from "@components/Header";

const { newMnemonic } = require("incognito-chain-web-js/build/web/wallet");

export interface MasterKeyPharsePageBaseProps {
  onBack?: () => void;
  masterKeyName?: string;
  phraseList?: string[];
  saveMyPhraseOnClick?: (mnemonic: string, phraseList: string[]) => void;
}

const MasterKeyPageBase: React.FC<MasterKeyPharsePageBaseProps> = (props: MasterKeyPharsePageBaseProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const [mnemonic, setMnemonic] = useState("");
  const [phraseListLocal, setPhraseListLocal] = useState<string[]>([]);

  const { onBack = () => {}, masterKeyName = "", phraseList = [], saveMyPhraseOnClick = () => {} } = props;

  useLayoutEffect(() => {
    if (!phraseList || phraseList.length < 1) {
      const mnemonic: string = newMnemonic() || "";
      setMnemonic(mnemonic);
      setPhraseListLocal((mnemonic.split(" ") as string[]) || []);
    } else {
      setPhraseListLocal(phraseList);
      setMnemonic(phraseList.join(" "));
    }
  }, []);

  const copyTextOnClick = () => {
    mnemonic && mnemonic.length > 0 && copy(mnemonic);
    enqueueSnackbar("Copied", { variant: "success" });
  };

  const saveMyPhrase = () => {
    saveMyPhraseOnClick && saveMyPhraseOnClick(mnemonic, phraseListLocal);
  };

  return (
    <>
      <Header title="Master key phrase" onGoBack={onBack} />
      <BodyLayout className="scroll-view">
        <YellowBox>
          <BookMarkContainer>
            <BookmarkIcon />
          </BookMarkContainer>
          <BookMarkText className="fs-small fw-medium">
            {"Save these words in the correct order. Never share this phrase with anyone."}
          </BookMarkText>
        </YellowBox>

        <MnemoicBox>
          {phraseListLocal.map((item, index) => (
            <MnemonicItemWrapper key={item}>
              <MnemonicItem key={item} index={index} title={item} />
            </MnemonicItemWrapper>
          ))}
        </MnemoicBox>

        <CopyButtonContainer>
          <CopyButton className="center hover-with-cursor" onClick={copyTextOnClick}>
            <CopyText className="fs-small fw-medium">{"Copy"}</CopyText>
          </CopyButton>
        </CopyButtonContainer>

        <PrimaryButtonContaniner onClick={saveMyPhrase}>{"I saved my phrase"}</PrimaryButtonContaniner>
      </BodyLayout>
    </>
  );
};

export default MasterKeyPageBase;
