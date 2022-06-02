import React from "react";
import styled, { ITheme } from "styled-components";

const Container = styled.div<{ marginTop: number }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .header-title {
    margin-bottom: 12px;
  }
  margin-top: ${({ marginTop }: { marginTop: number }) => marginTop}px;
`;

const TextAreaStyled = styled.textarea`
  padding: 10px 50px 10px 16px;
  width: 100%;
  height: 100%;
  background: ${({ theme }: { theme: ITheme }) => theme.primaryP9};
  border-radius: 8px;
  border-width: 1px;
  color: ${({ theme }: { theme: ITheme }) => theme.primaryP7};

  :focus {
    border: 2px solid ${({ theme }: { theme: ITheme }) => theme.colorP3};
  }

  :hover {
    outline: none !important;
    border: 2px solid ${({ theme }: { theme: ITheme }) => theme.colorP3};
  }

  ::placeholder {
    color: ${({ theme }: { theme: ITheme }) => theme.primaryP8};
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
const ErrorText = styled.p`
  width: 100%;
  color: ${({ theme }: { theme: ITheme }) => theme.colorP4};
  text-align: left;
  margin-top: 4px;
`;

interface TextAreaProps {
  value: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  errorEnable?: boolean;
  errorText?: string;
  header?: string;
  disabled?: boolean;
  marginTop?: number;
}

const TextArea = (props: TextAreaProps) => {
  const {
    value = "",
    header,
    errorEnable = false,
    errorText = "",
    placeholder = "",
    disabled = false,
    marginTop = 0,
    onChange = () => {},
  } = props;

  return (
    <Container className="input-container" marginTop={marginTop}>
      {!!header && <p className="header-title">{header}</p>}
      <TextAreaStyled
        placeholder={placeholder}
        className="full-width fs-regular"
        onChange={onChange}
        value={value}
        disabled={disabled}
      />
      {errorEnable && <ErrorText className="fs-regular">{errorText}</ErrorText>}
    </Container>
  );
};

export default TextArea;
