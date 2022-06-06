import React from "react";
import WrapContent from "@components/Content/Content";
import { InputField } from "@components/ReduxForm";
import { Field } from "redux-form";
import { FORM_CONFIGS } from "@module/Send";
import { INPUT_FIELD } from "@components/ReduxForm/InputField";
import styled from "styled-components";
import { IMergeProps } from "@module/Send/Send.enhance";

const Styled = styled.div`
  .scroll-view {
    padding-top: 24px;
  }
`;

const SendForm = React.memo((props: IMergeProps & any) => {
  const { onClickMax, validateAddress, warningAddress } = props;
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
            // validate={validateAmount}
          />
          <Field
            component={InputField}
            name={FORM_CONFIGS.toAddress}
            inputType={INPUT_FIELD.address}
            leftTitle="To"
            validate={validateAddress}
            warning={warningAddress}
          />
          <Field
            component={InputField}
            name={FORM_CONFIGS.memo}
            leftTitle="Memo"
            // onClickMax={onClickMax}
            // validate={validateAmount}
          />
          <Field
            component={InputField}
            name={FORM_CONFIGS.fee}
            leftTitle="Network Fee"
            inputType={INPUT_FIELD.leftTitleDisplayPTag}
            componentProps={{
              value: "PRV",
            }}
            subtitle="0.0000001"
            // onClickMax={onClickMax}
            // validate={validateAmount}
          />
        </form>
      </WrapContent>
    </Styled>
  );
});

export default SendForm;
