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
import InputFieldAmount from "@popup/components/ReduxForm/InputField/InputFieldAmount";
import InputFieldAddress from "@popup/components/ReduxForm/InputField/InputFieldAddress";
import InputFieldMemo from "@popup/components/ReduxForm/InputField/InputFieldMemo";

const Styled = styled.div`
  .scroll-view {
    padding-top: 24px;
    .btn-submit {
      margin-top: 32px;
    }
  }
`;

const SendForm = React.memo((props: IMergeProps & any) => {
  const {
    // onClickMax,
    // validateAmount,
    // validateAddress,
    // warningAddress,
    // handleSubmit,
    handleSend,
    isInitingForm,
    onClickAddressBook,

    //Props Amount Text Input
    amountValue,
    onAmountChange,
    onAmountBlur,
    amountError,
    onAmountMaxClicked,

    //Props Address Text Input
    addressValue,
    onAddressChange,
    onAddressBlur,
    addressError,

    //Memo
    memoValue,
    onMemoChange,

    sendBtnDisable,
  } = props;
  const { networkFeeSymbol, networkFeeText, showMemo, btnSubmit, disabledForm, accountBalanceStr } =
    useSelector(sendDataSelector);

  const isRenderFirstTime = React.useRef(true);

  React.useEffect(() => {
    isRenderFirstTime.current = false;
  }, []);

  const renderForm = () => {
    if (isInitingForm) return <LoadingContainer />;
    return (
      <>
        {/* <Field
          component={InputField}
          name={FORM_CONFIGS.amount}
          inputType={INPUT_FIELD.amount}
          componentProps={{
            type: "number",
          }}
          leftTitle="Amount"
          rightTitle={accountBalanceStr}
          onClickMax={onClickMax}
          validate={validateAmount}
        /> */}
        <InputFieldAmount
          value={amountValue}
          leftTitle="Amount"
          rightTitle={accountBalanceStr}
          // onClickMax={onClickMax}
          onClickMax={onAmountMaxClicked}
          error={amountError}
          onChange={onAmountChange}
          onBlur={onAmountBlur}
        />
        {/* <Field
          component={InputField}
          name={FORM_CONFIGS.toAddress}
          inputType={INPUT_FIELD.address}
          leftTitle="To"
          validate={validateAddress}
          warning={warningAddress}
          onClickAddressBook={onClickAddressBook}
        /> */}
        <InputFieldAddress
          value={addressValue}
          leftTitle="To"
          onClickAddressBook={onClickAddressBook}
          error={addressError}
          onChange={onAddressChange}
          onBlur={onAddressBlur}
        />
        <InputFieldMemo value={memoValue} leftTitle="Memo" onChange={onMemoChange} />
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
        <Button className="btn-submit" title={btnSubmit} disabled={sendBtnDisable} type="submit" onClick={handleSend} />
      </>
    );
  };

  return (
    <Styled>
      <WrapContent className="default-padding-horizontal">{renderForm()}</WrapContent>
    </Styled>
  );
});

export default SendForm;
