import React, { HTMLInputTypeAttribute, useState } from "react";
import styled, { ITheme } from "styled-components";
import { EyeCloseIcon, EyeOpenIcon } from "@popup/components/Icons";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TextInputWithIcon = styled.input`
  padding-left: 16px;
  padding-right: 50px;
  width: 100%;
  height: 48px;
  border-radius: 8px;
  border-width: 1;
  background: ${({ theme }: { theme: ITheme }) => theme.primaryP9};
  color: ${({ theme }: { theme: ITheme }) => theme.primaryP7};
  :focus {
    border: 2px solid ${({ theme }: { theme: ITheme }) => theme.colorP10};
  }
  :hover {
    outline: none !important;
    border: 2px solid ${({ theme }: { theme: ITheme }) => theme.colorP10};
  }
  ::placeholder {
    color: ${({ theme }: { theme: ITheme }) => theme.colorP11};
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.02em;
    flex: none;
    order: 0;
    flex-grow: 0;
  }
`;

const ErrorText = styled.p`
  width: 100%;
  color: red;
  text-align: left;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
`;

const IconContainer = styled.div`
  position: absolute;
  right: 40px;
  width: 30px;
  height: 30pxpx;
  justify-content: center;
  align-items: center;
  :hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

interface PasswordInputProps {
  value: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errorEnable?: boolean;
  errorText?: string;
}

const PasswordInput = (props: PasswordInputProps) => {
  const {
    value = "",
    errorEnable = false,
    errorText = "Password Invalid!",
    placeholder = "Enter your password",
    onChange = () => {},
  } = props;

  const [type, setType] = useState<HTMLInputTypeAttribute | undefined>("password");

  const onClick = () => {
    setType(type === "text" ? "password" : "text");
  };

  return (
    <Container>
      <InputWrapper>
        <TextInputWithIcon
          placeholder={placeholder}
          type={type}
          className="full-width"
          onChange={onChange}
          value={value}
        />
        <IconContainer onClick={onClick}>{type === "password" ? <EyeCloseIcon /> : <EyeOpenIcon />}</IconContainer>
      </InputWrapper>
      {errorEnable && <ErrorText className="fs-small fw-regular">{errorText}</ErrorText>}
    </Container>
  );
};

export default PasswordInput;
