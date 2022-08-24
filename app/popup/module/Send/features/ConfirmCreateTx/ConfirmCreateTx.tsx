import React from "react";
import WrapContent from "@components/Content/Content";
import { InputField } from "@components/ReduxForm";
import { Field } from "redux-form";
import { FORM_CONFIGS } from "@module/Send/Send.constant";
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

const ConfirmCreateTx = React.memo((props: IMergeProps & any) => {
  const {
    onClickMax,
    validateAmount,
    validateAddress,
    warningAddress,
    handleSubmit,
    handleSend,
    isInitingForm,
    onClickAddressBook,
  } = props;
  const { networkFeeSymbol, networkFeeText, showMemo, btnSubmit, accountBalanceStr, burnFeeSymbol, burnFeeText } =
    useSelector(sendDataSelector);

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
            readonly: "readonly",
          }}
          leftTitle="Amount"
          rightTitle={accountBalanceStr}
          onClickMax={onClickMax}
          validate={validateAmount}
          showMax={false}
        />
        <Field
          component={InputField}
          name={FORM_CONFIGS.toAddress}
          inputType={INPUT_FIELD.shortAddress}
          leftTitle="To"
          validate={validateAddress}
          warning={warningAddress}
          onClickAddressBook={onClickAddressBook}
          componentProps={{
            readonly: "readonly",
          }}
          showAddressBook={false}
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
          onClickAddressBook={() => {}}
          subtitle={networkFeeText}
        />
        <Field
          component={InputField}
          name={FORM_CONFIGS.burnFee}
          leftTitle="Outchain Fee (Est.)"
          inputType={INPUT_FIELD.leftTitleDisplayPTag}
          componentProps={{
            value: burnFeeSymbol,
          }}
          onClickAddressBook={() => {}}
          subtitle={burnFeeText}
        />
        <Button className="btn-submit" title={btnSubmit} type="submit" />
      </form>
    );
  };

  return (
    <Styled>
      <WrapContent className="default-padding-horizontal">{renderForm()}</WrapContent>
    </Styled>
  );
});

export default ConfirmCreateTx;
