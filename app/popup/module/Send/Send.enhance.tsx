import { change, focus, InjectedFormProps, reduxForm, reset } from "redux-form";
import { compose } from "recompose";
import { actionFreeData } from "@module/Send/Send.actions";
import { FORM_CONFIGS } from "@module/Send/Send.constant";
import withInit, { TInnerInit } from "./Send.enhanceInit";
import withValAddress, { TInner as TInnerAddress } from "./Send.enhanceAddressValidator";
import withValAmount, { TInner as TInnerAmount } from "./Send.enhanceAmountValidator";
import withSend, { TInner as TInnerSend } from "./Send.enhanceSend";
import withFee from "./Send.enhanceFee";
import React from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { sendDataSelector } from "@module/Send/Send.selector";
import { AppThunkDispatch } from "@redux/store";
import { useLoading } from "@popup/context/loading";
import { useHistory } from "react-router-dom";
import { route as routeAddressBook } from "@module/Account/features/AddressBook/AddressBook.route";
import { route as routeTokenDetail } from "@module/TokenDetail";
import enhanceUnshield from "@module/Send/Send.enhanceUnshield";

export interface IMergeProps extends InjectedFormProps<any, any>, TInnerInit, TInnerAmount, TInnerAddress, TInnerSend {
  onClickMax: () => any;
  onChangeField: (value: string, field: any) => any;
  onClickAddressBook: () => any;
  onClickScan: () => any;
  onGoBack: () => any;
  handleSend: () => any;
}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IMergeProps & any) => {
  const { handleSendAnonymously, handleUnShieldCrypto } = props;

  const dispatch: AppThunkDispatch = useDispatch();
  const history = useHistory();
  const { showLoading } = useLoading();
  const { maxAmountText, disabledForm, isSend, selectedPrivacy } = useSelector(sendDataSelector);

  const onChangeField = async (value: string, field: string) => {
    let val: any = value;
    dispatch(change(FORM_CONFIGS.formName, field, val));
    dispatch(focus(FORM_CONFIGS.formName, field));
  };

  const onClickMax = async () => {
    if (!maxAmountText) return;
    onChangeField(maxAmountText, FORM_CONFIGS.amount).then();
  };

  const onClickAddressBook = () => {
    history.push(routeAddressBook);
  };

  const onClickScan = () => {};

  const onGoBack = () => {
    history.push(`${routeTokenDetail}/${selectedPrivacy.tokenId}`);
  };

  const handleSend = async () => {
    try {
      if (disabledForm) {
        return;
      }
      showLoading({ value: true });
      if (isSend) {
        await handleSendAnonymously();
      } else {
        await handleUnShieldCrypto();
      }
    } catch (error) {
      // Handle error
    } finally {
      showLoading({ value: false });
    }
  };

  return (
    <WrappedComponent
      {...{
        ...props,
        onClickMax,
        onChangeField,
        onClickAddressBook,
        onClickScan,
        onGoBack,
        handleSend,
      }}
    />
  );
};

export default compose<IMergeProps, any>(
  reduxForm({
    form: FORM_CONFIGS.formName,
    destroyOnUnmount: false,
  }),
  withInit,
  withValAddress,
  withValAmount,
  withFee,
  withSend,
  enhanceUnshield,
  enhance,
);
