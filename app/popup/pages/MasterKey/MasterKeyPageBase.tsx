import Header from "@components/BaseComponent/Header";
import BodyLayout from "@components/layout/BodyLayout";
import MnemonicItem from "@components/Mnemonic/MnemonicItem";
import React, { useLayoutEffect, useState } from "react";
import {
  BookMarkImg,
  BookMarkText,
  CopyButton,
  CopyText,
  MnemoicBox,
  MnemonicItemWrapper,
  PrimaryButtonContaniner,
  YellowBox,
} from "./MasterKeyPage.styled";

const { newMnemonic } = require("incognito-chain-web-js/build/wallet");

export interface MasterKeyPharsePageBaseProps {
  onBack?: () => void;
  masterKeyName?: string;
  phraseList?: string[];
  saveMyPhraseOnClick?: (mnemonic: string, phraseList: string[]) => void;
}

const MasterKeyPageBase: React.FC<MasterKeyPharsePageBaseProps> = (props: MasterKeyPharsePageBaseProps) => {
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
    mnemonic &&
      mnemonic.length > 0 &&
      navigator.clipboard.writeText(mnemonic).then(
        function () {
          console.log("Copying to clipboard was successful!");
          alert("Copying to clipboard was successful!");
        },
        function (err) {
          console.error("Async: Could not copy text: ", err);
          alert("Could not copy text: ");
        },
      );
  };

  const saveMyPhrase = () => {
    saveMyPhraseOnClick && saveMyPhraseOnClick(mnemonic, phraseListLocal);
  };

  return (
    <>
      <Header title="Master key phrase" onBackClick={onBack} />
      <BodyLayout>
        <YellowBox>
          <BookMarkImg />
          <BookMarkText>Save these words in the correct order. Never share this phrase with anyone.</BookMarkText>
        </YellowBox>

        <MnemoicBox>
          {phraseListLocal.map((item, index) => (
            <MnemonicItemWrapper key={item}>
              <MnemonicItem key={item} index={index} title={item} />
            </MnemonicItemWrapper>
          ))}
        </MnemoicBox>

        <CopyButton onClick={copyTextOnClick}>
          <CopyText>Copy</CopyText>
        </CopyButton>

        <PrimaryButtonContaniner onClick={saveMyPhrase} disabled={false}>
          I'm saved my phrase
        </PrimaryButtonContaniner>
      </BodyLayout>
    </>
  );
};

export default MasterKeyPageBase;
