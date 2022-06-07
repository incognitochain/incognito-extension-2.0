import React from "react";
import WrapContent from "@components/Content/Content";
import { InputField } from "@components/ReduxForm";
import { Field } from "redux-form";
import { FORM_CONFIGS } from "@module/Send";
import { INPUT_FIELD } from "@components/ReduxForm/InputField";
import styled from "styled-components";
import { IMergeProps } from "@module/Send/Send.enhance";
import { Button } from "@components/Core";
import { useSelector } from "react-redux";
import { sendDataSelector } from "@module/Send/Send.selector";
import LoadingContainer from "@components/LoadingContainer";

const Styled = styled.div`
  .scroll-view {
    padding-top: 24px;
    .btn-submit {
      margin-top: 32px;
    }
  }
`;

const SendForm = React.memo((props: IMergeProps & any) => {
  const { onClickMax, validateAmount, validateAddress, warningAddress, handleSubmit, handleSend, isInitingForm } =
    props;
  const { networkFeeSymbol, networkFeeText, showMemo, btnSubmit, disabledForm } = useSelector(sendDataSelector);

  const renderMemo = () => {
    if (!showMemo) return null;
    return <Field component={InputField} name={FORM_CONFIGS.memo} leftTitle="Memo" />;
  };

  const renderForm = () => {
    if (isInitingForm) return <LoadingContainer />;
    return (
      <form onSubmit={handleSubmit(handleSend)}>
        <Field
          component={InputField}
          name={FORM_CONFIGS.amount}
          inputType={INPUT_FIELD.amount}
          componentProps={{
            type: "number",
          }}
          leftTitle="Amount"
          onClickMax={onClickMax}
          validate={validateAmount}
        />
        <Field
          component={InputField}
          name={FORM_CONFIGS.toAddress}
          inputType={INPUT_FIELD.address}
          leftTitle="To"
          validate={validateAddress}
          warning={warningAddress}
        />
        {renderMemo()}
        <Field
          component={InputField}
          name={FORM_CONFIGS.fee}
          leftTitle="Network Fee"
          inputType={INPUT_FIELD.leftTitleDisplayPTag}
          componentProps={{
            value: networkFeeSymbol,
          }}
          subtitle={networkFeeText}
        />
        <Button className="btn-submit" title={btnSubmit} disabled={disabledForm} type="submit" />
      </form>
    );
  };

  return (
    <Styled>
      <WrapContent className="default-padding-horizontal">{renderForm()}</WrapContent>
    </Styled>
  );
});

export default SendForm;
