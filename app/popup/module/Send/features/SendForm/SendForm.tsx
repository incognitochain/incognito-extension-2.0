import React from "react";
import WrapContent from "@components/Content/Content";
import { InputField } from "@components/ReduxForm";
import { Field } from "redux-form";
import { FORM_CONFIGS } from "@module/Send";
import { INPUT_FIELD } from "@components/ReduxForm/InputField";
import styled from "styled-components";

const Styled = styled.div`
  .scroll-view {
    padding-top: 24px;
  }
`;

const SendForm = React.memo(() => {
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
            // onClickMax={onClickMax}
            // validate={validateAmount}
          />
        </form>
      </WrapContent>
    </Styled>
  );
});

export default SendForm;
