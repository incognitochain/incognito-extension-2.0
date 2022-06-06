import { change, focus, InjectedFormProps, reduxForm } from "redux-form";
import { compose } from "recompose";
import { FORM_CONFIGS, ISendFormData } from "@module/Send";
import withInit, { TInnerInit } from "./Send.enhanceInit";
import withValAddress, { TInner as TInnerAddress } from "./Send.enhanceAddressValidator";
import withValAmount, { TInner as TInnerAmount } from "./Send.enhanceAmountValidator";
import withSend, { TInner as TInnerSend } from "./Send.enhanceSend";
import withFee from "./Send.enhanceFee";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendDataSelector } from "@module/Send/Send.selector";
import { AppThunkDispatch } from "@redux/store";

export interface IMergeProps extends InjectedFormProps<any, any>, TInnerInit, TInnerAddress, TInnerAmount, TInnerSend {
  onClickMax: () => any;
  onChangeField: (value: string, field: any) => any;
  onClickAddressBook: () => any;
  onClickScan: () => any;
  onGoBack: () => any;
  handleSend: (payload: ISendFormData) => any;
}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IMergeProps & any) => {
  const dispatch: AppThunkDispatch = useDispatch();

  // const { clearForceSendData, clearCurrentRequest, handleSendAnonymously, handleUnShieldCrypto }: IMergeProps = props;
  // const history = useHistory();
  // const darkMode = useSelector(darkModeSelector);
  // const handleStandardizedAddress = (value: string) => standardizedAddress(value);
  // const selectedPrivacy: ISelectedPrivacy = useSelector(selectedPrivacySelector);
  // const { disabledForm, isSend, isUnShield }: ISendData = useSelector(sendDataSelector);

  const { maxAmountText } = useSelector(sendDataSelector);
  const onChangeField = async (value: string, field: string) => {
    let val: any = value;
    // if (field === "toAddress") {
    //   val = handleStandardizedAddress(value);
    // }
    dispatch(change(FORM_CONFIGS.formName, field, val));
    // dispatch(focus(FORM_CONFIGS.formName, field));
  };

  const onClickMax = async () => {
    console.log("SANG TEST: ", maxAmountText);
    if (!maxAmountText) return;
    onChangeField(maxAmountText, FORM_CONFIGS.amount).then();
  };

  const onClickAddressBook = () => {
    // dispatch(
    //   actionToggleModal({
    //     data: (
    //       <AddressBook
    //         onGoBack={() => dispatch(actionToggleModal({}))}
    //         onSelectedAddrBook={(addressBook: IAddressBook) => {
    //           onChangeField(addressBook.address, FORM_CONFIGS.toAddress);
    //           dispatch(actionToggleModal({}));
    //         }}
    //         filterBySelectedPrivacy
    //       />
    //     ),
    //     customModalStyle: {
    //       backgroundColor: darkMode && COLORS.black2,
    //     },
    //   }),
    // );
  };

  const handleScanQrCode = (value: any) => {
    // if (isString(value)) {
    //   onChangeField(value, FORM_CONFIGS.toAddress);
    //   dispatch(actionToggleModal({}));
    // }
  };

  const onClickScan = () => {
    // dispatch(
    //   actionToggleModal({
    //     data: <QrReader onScan={handleScanQrCode} />,
    //     isLoadingModal: true,
    //   }),
    // );
  };

  const onGoBack = () => {
    // clearForceSendData && clearForceSendData();
    // clearCurrentRequest && clearCurrentRequest();
    // history.push(`${routeDetail}/${selectedPrivacy.tokenId}`);
  };

  const handleSend = async (payload: ISendFormData) => {
    // try {
    //   if (disabledForm) {
    //     return;
    //   }
    //   await dispatch(
    //     actionToggleModal({
    //       data: <LoadingTx />,
    //       isLoadingModal: true,
    //     }),
    //   );
    //   if (isSend) {
    //     await handleSendAnonymously(payload);
    //   }
    //   if (isUnShield) {
    //     await handleUnShieldCrypto();
    //   }
    // } catch (error) {
    //   dispatch(
    //     actionToggleToast({
    //       toggle: true,
    //       value: error,
    //       type: TOAST_CONFIGS.error,
    //       defaultMessage: {
    //         defaultChainErrorMsg: ERROR_MESSAGE.DEFAULT_ERROR_SEND,
    //       },
    //     }),
    //   );
    // }
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
  }),
  withInit,
  withValAddress,
  withValAmount,
  withFee,
  withSend,
  enhance,
);
