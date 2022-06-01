import { P2_Regular } from "@popup/theme/Theme";
import React from "react";
import styled, { ITheme } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const TextAreaStyled = styled.textarea`
  padding-top: 10px;
  padding-left: 16px;
  padding-right: 50px;
  width: 100%;
  height: 100%;
  background: #404040;
  border-radius: 8px;
  border-width: 1;
  color: ${({ theme }: { theme: ITheme }) => theme.primaryP7};
  :focus {
    border: 2px solid #1a73e8;
  }
  :hover {
    outline: none !important;
    border: 2px solid #1a73e8;
  }
  ::placeholder {
    color: #9c9c9c;
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.02em;
    flex: none;
    order: 0;
    flex-grow: 0;
  }
`;
const ErrorText = styled(P2_Regular)`
  width: 100%;
  color: red;
  text-align: left;
`;

interface TextAreaProps {
  value: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  errorEnable?: boolean;
  errorText?: string;
  multiple?: boolean;
}

const TextArea = (props: TextAreaProps) => {
  const {
    value = "",
    errorEnable = false,
    errorText = "",
    placeholder = "",
    multiple = false,
    onChange = () => {},
  } = props;

  return (
    <Container>
      <TextAreaStyled placeholder={placeholder} className="full-width" onChange={onChange} value={value} />
      {errorEnable && <ErrorText>{errorText}</ErrorText>}
    </Container>
  );
};

export default TextArea;
