import { change, focus, InjectedFormProps, reduxForm } from "redux-form";
import { compose } from "recompose";
import withInit, { TInnerInit } from "./SignTransaction.enhanceInit";
import React from "react";
import { useDispatch } from "react-redux";
import { AppThunkDispatch } from "@redux/store";
import { useLoading } from "@popup/context/loading";
import { useHistory } from "react-router-dom";
import withValAmount, { TInner as TInnerAmount } from "./SignTransaction.enhanceAmountValidator";
import { FORM_CONFIGS } from "./SignTransaction.constant";
import enhanceSignTxs from "@module/SignTransaction/SignTransaction.enhanceSign";
import { withBalance } from "@module/MainRoute";

export interface IMergeProps extends InjectedFormProps<any, any>, TInnerInit, TInnerAmount {
  onChangeField: (value: string, field: any) => any;
  handleSign: () => any;
}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IMergeProps & any) => {
  const dispatch: AppThunkDispatch = useDispatch();
  const { disabledForm, handleSendCrypto } = props;

  const onChangeField = async (value: string, field: string) => {
    let val: any = value;
    dispatch(change(FORM_CONFIGS.formName, field, val));
    dispatch(focus(FORM_CONFIGS.formName, field));
  };

  const handleSign = async () => {
    try {
      if (disabledForm) {
        return;
      }
      handleSendCrypto();
    } catch (error) {
      // Handle error
    }
  };

  return (
    <WrappedComponent
      {...{
        ...props,
        onChangeField,
        handleSign,
      }}
    />
  );
};

export default compose<IMergeProps, any>(
  reduxForm({
    form: FORM_CONFIGS.formName,
    destroyOnUnmount: false,
  }),
  withBalance,
  withInit,
  withValAmount,
  enhanceSignTxs,
  enhance,
);
