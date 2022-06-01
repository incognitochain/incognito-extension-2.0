import { MainLayout } from "@popup/components/layout/MainLayout";
import React from "react";
import { useHistory } from "react-router-dom";
import { Paths } from "../../components/routes/paths";
import {
  CircleImageContainer,
  ExtensionTextContainer,
  IncognitoImageContainer,
  PrimaryButtonContaniner,
  SecondaryButtonContaniner,
} from "./GetStartedPage.styled";

export const GetStartedPageBase1: React.FC = () => {
  const history = useHistory();

  return (
    <MainLayout>
      <CircleImageContainer />
      <IncognitoImageContainer />
      <ExtensionTextContainer>Extention</ExtensionTextContainer>
      <PrimaryButtonContaniner
        onClick={() => {
          history.push(Paths.createNewKeyStack);
        }}
        disabled={false}
      >
        Create new key
      </PrimaryButtonContaniner>

      <SecondaryButtonContaniner
        onClick={() => {
          history.push(Paths.importMasterKeyStack);
        }}
      >
        Import pharse
      </SecondaryButtonContaniner>
    </MainLayout>
  );
};
