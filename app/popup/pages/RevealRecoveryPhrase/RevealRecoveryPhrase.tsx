import Header from "@components/Header";
import BodyLayout from "@components/layout/BodyLayout";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, PrimaryButtonContaniner } from "./styles";
import { MnemoicBox, MnemonicItemWrapper } from "@popup/pages/MasterKey/MasterKeyPage.styled";
import MnemonicItem from "@components/Mnemonic/MnemonicItem";
import { useBackground } from "@popup/context/background";
import QrCodeModal from "@popup/components/QrCodeModal";
import WrapContent from "@popup/components/Content";
import { useSnackbar } from "notistack";
import copy from "copy-to-clipboard";

const RevealRecoveryPhrase: React.FC = () => {
  const history = useHistory();
  const { request } = useBackground();
  const { enqueueSnackbar } = useSnackbar();

  const [mnemonic, setMnemonic] = useState([]);

  useEffect(() => {
    const requestMnemonic = async () => {
      let mnemonic = [];
      try {
        const data: any = await request("popup_requestRevealMasterKeyPhrase", {});
        mnemonic = data.result?.mnemonic?.split(" ") || [];
      } catch (error) {
        console.log("ERROR : ", error);
      } finally {
        setMnemonic(mnemonic);
      }
    };
    requestMnemonic();
  }, []);

  if (!mnemonic) return null;
  const mnemonicToString = mnemonic.join(" ");

  const copyOnPress = () => {
    if (mnemonicToString && mnemonicToString.length < 1) return;
    copy(mnemonicToString);
    enqueueSnackbar("Copied", { variant: "success" });
  };

  return (
    <>
      <Header title="Master key pharase" onGoBack={() => history.goBack()} />
      <WrapContent className="scroll-view no-padding">
        <BodyLayout>
          <Container>
            <p className="description fs-medium fw-regular">
              {"Save these words in the correct order. Never share this phrase with anyone else."}
            </p>

            <MnemoicBox>
              {mnemonic.map((item, index) => (
                <MnemonicItemWrapper key={item}>
                  <MnemonicItem
                    key={item}
                    index={index}
                    title={item}
                    disabled={true}
                    // onClick={() => mnemonicItemChoose(item)}
                  />
                </MnemonicItemWrapper>
              ))}
            </MnemoicBox>

            <QrCodeModal label={""} value={mnemonicToString} showCopyAddressBar={false} />

            <PrimaryButtonContaniner onClick={copyOnPress}>{"Copy"}</PrimaryButtonContaniner>
          </Container>
        </BodyLayout>
      </WrapContent>
    </>
  );
};
export default RevealRecoveryPhrase;
