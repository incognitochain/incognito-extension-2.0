import { P2_Regular } from "@popup/theme/Theme";
import React, { HTMLInputTypeAttribute, useState } from "react";
import styled, { ITheme } from "styled-components";

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

const EyeCloseIconStyled = styled.img`
  position: absolute;
  right: 40px;
  width: 26px;
  height: 24px;
  align-items: center;
  :hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

const EyeOpenIconStyled = styled.img`
  position: absolute;
  right: 40px;
  width: 26px;
  height: 16px;
  align-items: center;
  :hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
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

  const Icon =
    type === "password" ? (
      <EyeCloseIconStyled src="./icons/ic_eye_closed.png" onClick={onClick} />
    ) : (
      <EyeOpenIconStyled src="./icons/ic_eye_open.png" onClick={onClick} />
    );

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
        {Icon}
      </InputWrapper>
      {errorEnable && <ErrorText>{errorText}</ErrorText>}
    </Container>
  );
};

export default PasswordInput;
