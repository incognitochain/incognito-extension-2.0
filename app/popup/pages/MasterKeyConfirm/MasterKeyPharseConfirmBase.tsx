import BodyLayout from "@components/layout/BodyLayout";
import MnemonicItem from "@components/Mnemonic/MnemonicItem";
import { shuffle } from "lodash";
import React, { useMemo, useState } from "react";
import { MnemoicBox, MnemonicItemWrapper } from "../MasterKey/MasterKeyPage.styled";
import {
  DescriptionText,
  MnemonicsText,
  MnemonicTextPickArea,
  PrimaryButtonContaniner,
} from "./MasterKeyPharseConfirm.styled";
import Header from "@components/Header";

export interface MasterKeyPharseConfirmPageBaseProps {
  onBack?: () => void;
  createMasterKeySucess?: () => void;
  continueOnPress?: () => void;
  phraseList?: string[];
}

const MasterKeyPharseConfirmBase: React.FC<MasterKeyPharseConfirmPageBaseProps> = (
  props: MasterKeyPharseConfirmPageBaseProps,
) => {
  const [phraseListSelected, setPhraseListSelected] = useState<string[]>([]);
  const { onBack = () => {}, createMasterKeySucess = () => {}, continueOnPress = () => {}, phraseList = [] } = props;

  const mnemonicCorrect = useMemo(() => phraseList.join(" "), []);
  const phraseListShuffle = useMemo(() => shuffle(phraseList), []);

  const [isPhraseCorrect, phraseSelectedString] = useMemo(() => {
    const phraseSelectedJoin = phraseListSelected.join(" ");
    return [phraseSelectedJoin === mnemonicCorrect, phraseSelectedJoin];
  }, [phraseListSelected]) as [boolean, string];

  const createMasterKeyOnClick = () => {
    continueOnPress();
  };

  const mnemonicItemChoose = (title: string) => {
    const newPhraseListSelected = [...phraseListSelected];
    const findIndex = newPhraseListSelected.findIndex((item) => item === title);
    if (findIndex != -1) {
      newPhraseListSelected.splice(findIndex, 1);
    } else {
      newPhraseListSelected.push(title || "");
    }
    setPhraseListSelected(newPhraseListSelected);
  };
  return (
    <>
      <Header title="Master key phrase" onGoBack={onBack} />
      <BodyLayout>
        <DescriptionText className="fs-regular fw-regular">
          {"Click on these words in the correct order. If you make a mistake, click again to undo."}
        </DescriptionText>

        <MnemoicBox>
          {phraseListShuffle.map((item, index) => (
            <MnemonicItemWrapper key={item}>
              <MnemonicItem
                key={item}
                index={index}
                title={item}
                disabled={false}
                onClick={() => mnemonicItemChoose(item)}
              />
            </MnemonicItemWrapper>
          ))}
        </MnemoicBox>

        <MnemonicTextPickArea>
          <MnemonicsText>{phraseSelectedString}</MnemonicsText>
        </MnemonicTextPickArea>

        <PrimaryButtonContaniner disabled={!isPhraseCorrect} onClick={createMasterKeyOnClick}>
          {isPhraseCorrect ? "Continue" : "That's not quite right"}
        </PrimaryButtonContaniner>
      </BodyLayout>
    </>
  );
};

export default MasterKeyPharseConfirmBase;
