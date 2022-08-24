import WrapContent from "@components/Content/Content";
import Header from "@components/Header";
import React from "react";
import { MainContent } from "./SignTransaction.styled";
import enhance, { IMergeProps } from "./SignTransaction.enhance";
import LoadingContainer from "@components/LoadingContainer";
import styled from "styled-components";
import { Field } from "redux-form";
import { InputField } from "@components/ReduxForm";
import { FORM_CONFIGS } from "@module/Send/Send.constant";
import { INPUT_FIELD } from "@components/ReduxForm/InputField";
import { Button } from "@components/Core";
import { PRV } from "@constants/common";

const Styled = styled.div`
  .scroll-view {
    padding-top: 24px;
    .btn-submit {
      margin-top: 32px;
    }
  }
`;

const SignTransaction: React.FC = React.memo((props: IMergeProps & any) => {
  const {
    validateAmount,
    validateAddress,
    warningAddress,
    handleSubmit,
    handleSign,
    isInitingForm,
    networkFeeText,
    maxInputAmountText,
    selectedPrivacy,
  } = props;

  const renderForm = () => {
    if (isInitingForm) return <LoadingContainer />;
    return (
      <form onSubmit={handleSubmit(handleSign)}>
        <Field
          component={InputField}
          name={FORM_CONFIGS.amount}
          inputType={INPUT_FIELD.amount}
          componentProps={{
            type: "number",
            readonly: "readonly",
          }}
          leftTitle="Amount"
          rightTitle={`${maxInputAmountText} ${selectedPrivacy.symbol}`}
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
          componentProps={{
            readonly: "readonly",
          }}
          showAddressBook={false}
        />
        {/*{renderMemo()}*/}
        <Field
          component={InputField}
          name={FORM_CONFIGS.fee}
          leftTitle="Network Fee"
          inputType={INPUT_FIELD.leftTitleDisplayPTag}
          componentProps={{
            value: PRV.symbol,
          }}
          onClickAddressBook={() => {}}
          subtitle={networkFeeText}
        />
        <Button className="btn-submit" title="Sign transaction" type="submit" />
      </form>
    );
  };

  return (
    <>
      <Header title="Sign Transaction" showBack={false} />
      <Styled>
        <WrapContent className="default-padding-horizontal">{renderForm()}</WrapContent>
      </Styled>
    </>
  );
});

export default enhance(SignTransaction);
