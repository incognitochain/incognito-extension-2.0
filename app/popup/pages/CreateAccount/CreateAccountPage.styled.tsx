import { PrimaryButton } from "@popup/components/Buttons";
import { P2_Regular } from "@popup/theme/Theme";
import styled from "styled-components";

const TextInputWraper = styled.div`
  width: 100%;
  margin-top: 8px;
`;

const KeyChainLabel = styled(P2_Regular)`
  width: 100%;
  margin-top: 24px;
  text-align: left;
`;

const PrimaryButtonContaniner = styled(PrimaryButton)`
  margin-top: 90px;
`;

export { TextInputWraper, KeyChainLabel, PrimaryButtonContaniner };
