import React from "react";
import { WrappedFieldInputProps, WrappedFieldMetaProps } from "redux-form";
import { AddressBookIcon, EyeIcon, ScanIcon } from "@components/Icons";
import { INPUT_FIELD } from "./InputField.constant";
import { Styled } from "./InputField.styled";
import MaxBtn from "@components/Max/Max";
import { Row } from "@popup/theme";

export interface IInputFieldProps {
  meta: WrappedFieldMetaProps;
  input: WrappedFieldInputProps;
  componentProps: React.InputHTMLAttributes<HTMLInputElement> | any;
  inputType?: number;
  subtitle?: boolean;
  suffix?: string;
  onClickMax?: () => any;
  onClickAddressBook?: () => any;
  onClickScan?: () => any;
  warning?: string;
  errorCustom?: string;
  leftTitle: string;
  rightTitle?: string;
  showMax?: boolean;
  showAddressBook?: boolean;
}

interface IInputProps {
  input: WrappedFieldInputProps;
  componentProps: React.InputHTMLAttributes<HTMLInputElement>;
}

interface ITextAreaProps {
  input: WrappedFieldInputProps;
  componentProps: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
}

export const Input = React.memo((props: IInputProps) => {
  const { input: inputProps, componentProps } = props;
  return <input className="h5" type="text" autoComplete="off" {...inputProps} {...componentProps} />;
});

export const TextArea = React.memo((props: ITextAreaProps) => {
  const { input: inputProps, componentProps } = props;
  return <textarea className="h5" autoComplete="off" {...inputProps} {...componentProps} />;
});

const InputField = (props: IInputFieldProps) => {
  const {
    meta,
    input,
    componentProps,
    inputType,
    subtitle,
    suffix,
    onClickMax,
    onClickAddressBook,
    onClickScan,
    warning,
    errorCustom,
    leftTitle,
    rightTitle,
    showMax = true,
    showAddressBook = true,
  } = props;
  const { error: errorMeta, touched, submitting } = meta;
  const error = errorMeta || errorCustom;
  const [togglePassword, setTogglePassword] = React.useState(false);
  const handleTogglePassword = () => setTogglePassword(!togglePassword);
  const renderError = () => {
    if (submitting) {
      return null;
    }
    return (
      <>
        {(touched && error && (
          <p
            className={`error fs-small fw-regular ${
              inputType === INPUT_FIELD.leftTitleDisplayPTag ? "align-right" : ""
            }`}
          >
            {error}
          </p>
        )) ||
          (touched && warning && (
            <p
              className={`warning fs-small fw-regular ${
                inputType === INPUT_FIELD.leftTitleDisplayPTag ? "align-right" : ""
              }`}
            >
              {warning}
            </p>
          ))}
      </>
    );
  };

  const renderHeader = () => {
    return (
      <Row className="wrap-input-header">
        <p className="fs-small fw-regular">{leftTitle}</p>
        {rightTitle && <p className="fs-small fw-regular">{rightTitle}</p>}
      </Row>
    );
  };
  const renderInput = () => {
    switch (inputType) {
      case INPUT_FIELD.amount:
        return (
          <div className={`input-container ${showAddressBook ? "input-amount" : ""}`}>
            <Input {...{ input, componentProps }} />
            {showMax && (
              <div className="sub-icon">
                <MaxBtn onClick={onClickMax} />
              </div>
            )}
          </div>
        );
      case INPUT_FIELD.address:
        return (
          <div className={`input-container ${showAddressBook ? "input-address" : ""}`}>
            <Input {...{ input, componentProps }} />
            {showAddressBook && (
              <div className="sub-icon">
                <AddressBookIcon onClick={onClickAddressBook} />
              </div>
            )}
            {/*<div className="sub-icon">*/}
            {/*  <ScanIcon onClick={onClickScan} />*/}
            {/*</div>*/}
          </div>
        );
      case INPUT_FIELD.leftTitleDisplayPTag: {
        const value = componentProps?.value || input?.value || "";
        return (
          <div className="hook-row-space-between wrapper">
            <p className="h5">{subtitle}</p>
            <p className="h5">{value}</p>
            {/*<div className="wrap-content">*/}
            {/*  {suffix && <p className="suffix ellipsis">{suffix}</p>}*/}
            {/*</div>*/}
          </div>
        );
      }
      case INPUT_FIELD.password: {
        return (
          <div className="input-container input-password">
            <Input
              {...{
                input,
                componentProps: { ...componentProps, type: togglePassword ? "text" : "password" },
              }}
            />
            <div className="sub-icon">
              <EyeIcon toggle={togglePassword} onClick={handleTogglePassword} />
            </div>
          </div>
        );
      }
      case INPUT_FIELD.textArea: {
        return (
          <div className="textarea-container ">
            <TextArea {...{ input, componentProps }} />
          </div>
        );
      }
      default:
        return (
          <div className="input-container">
            <Input {...{ input, componentProps }} />
          </div>
        );
    }
  };
  return (
    <Styled>
      {renderHeader()}
      {renderInput()}
      {renderError()}
    </Styled>
  );
};

export default React.memo(InputField);
