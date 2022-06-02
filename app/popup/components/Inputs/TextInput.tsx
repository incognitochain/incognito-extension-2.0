import { P2_Regular } from "@popup/theme/Theme";
import React from "react";
import styled, { ITheme } from "styled-components";

const Container = styled.div<{ marginTop: number }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .header-title {
    margin-bottom: 8px;
  }
  margin-top: ${({ marginTop }: { marginTop: number }) => marginTop}px;
`;

const TextInputStyled = styled.input`
  padding-left: 16px;
  padding-right: 50px;
  width: 100%;
  height: 100%;
  min-height: 48px;
  background: #404040;
  border-radius: 8px;
  border-width: 1px;
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

interface TextInputProps {
  value: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errorEnable?: boolean;
  errorText?: string;
  multiple?: boolean;
  header?: string;
  disabled?: boolean;
  marginTop?: number;
}

const TextInput = (props: TextInputProps) => {
  const {
    value = "",
    header,
    errorEnable = false,
    errorText = "",
    placeholder = "",
    multiple = false,
    disabled = false,
    marginTop = 0,
    onChange = () => {},
  } = props;

  return (
    <Container className="input-container" marginTop={marginTop}>
      {!!header && <p className="header-title">{header}</p>}
      <TextInputStyled
        placeholder={placeholder}
        type={"text"}
        className="full-width"
        onChange={onChange}
        value={value}
        disabled={disabled}
        multiple={multiple}
      />
      {errorEnable && <ErrorText>{errorText}</ErrorText>}
    </Container>
  );
};

export default TextInput;
