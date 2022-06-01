import { PrimaryButton } from "@popup/components/Buttons";
import { P1_Regular, P2_Regular } from "@popup/theme/Theme";
import styled from "styled-components";

const PasswordLabel = styled(P2_Regular)`
  width: 100%;
  text-align: left;
  margin-top: 30px;
  margin-bottom: 8px;
`;

const VerifyLabel = styled(P2_Regular)`
  width: 100%;
  text-align: left;
  margin-top: 16px;
  margin-bottom: 8px;
`;

const DescriptionText = styled(P1_Regular)`
  margin-top: 24px;
`;

const PrimaryButtonContaniner = styled(PrimaryButton)`
  margin-top: 140px;
  margin-bottom: 10px;
`;

export { PrimaryButtonContaniner, DescriptionText, PasswordLabel, VerifyLabel };
