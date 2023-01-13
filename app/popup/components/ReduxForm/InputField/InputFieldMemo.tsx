import { Row } from "@popup/theme";
import React, { FocusEventHandler } from "react";
import { Styled } from "./InputField.styled";

export interface Props {
  leftTitle: string;
  rightTitle?: string;
  error?: string;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: FocusEventHandler<any> | undefined;
}

const InputFieldMemo = (props: Props) => {
  const { leftTitle, rightTitle, error, value = "", onChange = () => {}, onBlur = () => {} } = props;

  const renderError = () => {
    if (!error) return null;
    return <p className={`error fs-small fw-regular`}>{error}</p>;
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
    return (
      <div className={`input-container input-amount`}>
        <input className="h5" type="text" autoComplete="off" value={value} onChange={onChange} onBlur={onBlur} />
      </div>
    );
  };
  return (
    <Styled>
      {renderHeader()}
      {renderInput()}
      {renderError()}
    </Styled>
  );
};

export default React.memo(InputFieldMemo);
