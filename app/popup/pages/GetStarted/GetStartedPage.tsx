import CircleIcon from "@components/Icons/CircleIcon";
import IncognitoIcon from "@components/Icons/IncognitoIcon";
import { Paths } from "@components/routes/paths";
import { MainLayout } from "@popup/components/layout/MainLayout";
import React from "react";
import { useHistory } from "react-router-dom";
import {
  CircleIconContainer,
  IncognitoContainer,
  PrimaryButtonWrapper,
  SecondaryButtonWrapper,
  Title,
} from "./GetStartedPage.styled";
export const GetStartedPage: React.FC = () => {
  const history = useHistory();

  return (
    <MainLayout>
      <CircleIconContainer>
        <CircleIcon />
      </CircleIconContainer>
      <IncognitoContainer>
        <IncognitoIcon />
      </IncognitoContainer>
      <Title className="fs-regular fw-medium">{"Extention"}</Title>
      <PrimaryButtonWrapper
        onClick={() => {
          history.push(Paths.createNewKeyStack);
        }}
        disabled={false}
      >
        {"Create new key"}
      </PrimaryButtonWrapper>
      <SecondaryButtonWrapper
        onClick={() => {
          history.push(Paths.importMasterKeyStack);
        }}
      >
        {"Import phrase"}
      </SecondaryButtonWrapper>
    </MainLayout>
  );
};
