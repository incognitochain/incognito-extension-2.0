import React, { HTMLInputTypeAttribute, useState } from "react";
import styled, { ITheme } from "styled-components";
import { H4, P2_Regular, P1_Regular } from "@popup/theme/Theme";
import { PrimaryButton } from "@popup/components/Buttons";

const MasterKeyNameLabel = styled(P2_Regular)`
  width: 100%;
  text-align: left;
  margin-top: 30px;
  margin-bottom: 4px;
`;

const TextInputWraper = styled.div`
  width: 100%;
  height: 48px;
  margin-top: 8px;
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
  margin-top: 100px;
  margin-bottom: 10px;
`;

const MnemonicTextArea = styled.div`
  width: 100%;
  display: flex;
  margin-top: 20px;
  height: 140px;
  background: #404040;
  border-radius: 8px;
`;

export { PrimaryButtonContaniner, DescriptionText, MasterKeyNameLabel, VerifyLabel, TextInputWraper, MnemonicTextArea };
