import { PrimaryButtonStyled } from "@popup/components/Core/Buttons";
import styled from "styled-components";

const Container = styled.div`
  .description {
    margin-top: 20px;
  }
`;

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
  margin-top: 30px;
  margin-bottom: 30px;
`;

export { Container, TextInputWraper, KeyChainLabel, PrimaryButtonContaniner };
