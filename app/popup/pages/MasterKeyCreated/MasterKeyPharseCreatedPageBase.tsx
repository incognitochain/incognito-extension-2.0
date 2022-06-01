import React from "react";
import { useHistory } from "react-router-dom";
import { Paths } from "../../components/routes/paths";
import {
  CircleImageContainer,
  ExtensionTextContainer,
  IncognitoImageContainer,
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
      <CircleImageContainer />
      <IncognitoImageContainer />
      <ExtensionTextContainer>Extention</ExtensionTextContainer>
      <PrimaryButtonContaniner
        onClick={() => {
          history.push(Paths.homeRouteStack);
        }}
        disabled={false}
      >
        Create new key
      </PrimaryButtonContaniner>
    </>
  );
};

export default MasterKeyPharseCreatedPageBase;
