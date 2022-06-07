import CircleIcon from "@components/Icons/CircleIcon";
import IncognitoIcon from "@components/Icons/IncognitoIcon";
import React from "react";
import { useHistory } from "react-router-dom";
import { Paths } from "@components/routes/paths";
import {
  CircleIconContainer,
  ExtensionTextContainer,
  IncognitoContainer,
  PrimaryButtonContaniner,
} from "./MasterKeyPharseCreated.styled";

export interface MasterKeyPharseCreatedPageBaseProps {
  onContinue?: () => void;
}

const MasterKeyPharseCreatedPageBase = (props: MasterKeyPharseCreatedPageBaseProps) => {
  const { onContinue = () => {} } = props;
  const history = useHistory();
  return (
    <>
      <CircleIconContainer>
        <CircleIcon />
      </CircleIconContainer>
      <IncognitoContainer>
        <IncognitoIcon />
      </IncognitoContainer>
      <ExtensionTextContainer>{"Extention"}</ExtensionTextContainer>
      <PrimaryButtonContaniner
        onClick={() => {
          history.push(Paths.homeRouteStack);
        }}
        disabled={false}
      >
        {"Create new key"}
      </PrimaryButtonContaniner>
    </>
  );
};

export default MasterKeyPharseCreatedPageBase;
