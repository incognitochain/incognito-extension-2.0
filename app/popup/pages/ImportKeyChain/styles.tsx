import { PrimaryButtonStyled } from "@popup/components/Core/Buttons";
import styled from "styled-components";

const TextInputWraper = styled.div`
  width: 100%;
  margin-top: 8px;
`;

const KeyChainLabel = styled.p`
  width: 100%;
  margin-top: 24px;
  text-align: left;
`;

const PrimaryButtonContaniner = styled(PrimaryButtonStyled)`
  margin-top: 90px;
`;

export { TextInputWraper, KeyChainLabel, PrimaryButtonContaniner };
