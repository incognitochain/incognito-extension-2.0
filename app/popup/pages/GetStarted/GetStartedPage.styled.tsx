import React, { HTMLInputTypeAttribute, useState } from "react";
import styled, { ITheme } from "styled-components";
import { H4, P2_Regular, P1, H3 } from "@popup/theme/Theme";
import { PrimaryButton, SecondaryButton } from "@popup/components/Buttons";

const PrimaryButtonContaniner = styled(PrimaryButton)`
  margin-top: 120px;
`;

const SecondaryButtonContaniner = styled(SecondaryButton)`
  margin-top: 8px;
`;

const CircleImage = styled.img`
  width: 72px;
  height: 72px;
  margin-top: 180px;
`;

const IncognitoImage = styled.img`
  width: 160px;
  height: 38px;
  margin-top: 16px;
`;

const ExtensionTextContainer = styled(P1)`
  text-align: center;
  margin-top: 8px;
  color: #c0c0c0;
`;

const CircleImageContainer = () => <CircleImage src="./icons/ic_circle.png" />;
const IncognitoImageContainer = () => <IncognitoImage src="./icons/label_incognito.png" />;

export {
  CircleImageContainer,
  IncognitoImageContainer,
  ExtensionTextContainer,
  PrimaryButtonContaniner,
  SecondaryButtonContaniner,
};
