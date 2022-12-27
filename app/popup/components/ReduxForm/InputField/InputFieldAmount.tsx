import MaxBtn from "@components/Max/Max";
import { Row } from "@popup/theme";
import React, { FocusEventHandler } from "react";
import { Styled } from "./InputField.styled";

export interface Props {
  onClickMax?: () => any;
  leftTitle: string;
  rightTitle?: string;
  showMax?: boolean;
  error?: string;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: FocusEventHandler<any> | undefined;
}

const InputFieldAmount = (props: Props) => {
  const {
    onClickMax,
    leftTitle,
    rightTitle,
    showMax = true,
    error,
    value = "",
    onChange = () => {},
    onBlur = () => {},
  } = props;

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
        <input className="h5" type="number" autoComplete="off" value={value} onChange={onChange} onBlur={onBlur} />
        {showMax && (
          <div className="sub-icon">
            <MaxBtn onClick={onClickMax} />
          </div>
        )}
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

export default React.memo(InputFieldAmount);
