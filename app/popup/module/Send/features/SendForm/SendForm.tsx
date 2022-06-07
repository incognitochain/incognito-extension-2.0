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

const Styled = styled.div`
  .scroll-view {
    padding-top: 24px;
  }
`;

const SendForm = React.memo((props: IMergeProps & any) => {
  const { onClickMax, validateAmount, validateAddress, warningAddress } = props;
  const { networkFeeSymbol, networkFeeText, showMemo, btnSubmit } = useSelector(sendDataSelector);

  return (
    <Styled>
      <WrapContent className="default-padding-horizontal">
        <form>
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
          {showMemo && (
            <Field
              component={InputField}
              name={FORM_CONFIGS.memo}
              leftTitle="Memo"
              // onClickMax={onClickMax}
              // validate={validateAmount}
            />
          )}
          <Field
            component={InputField}
            name={FORM_CONFIGS.fee}
            leftTitle="Network Fee"
            inputType={INPUT_FIELD.leftTitleDisplayPTag}
            componentProps={{
              value: networkFeeSymbol,
            }}
            subtitle={networkFeeText}
            // onClickMax={onClickMax}
            // validate={validateAmount}
          />
          <Button title={btnSubmit} style={{ marginTop: 24 }} onClick={() => {}} />
        </form>
      </WrapContent>
    </Styled>
  );
});

export default SendForm;
