import React from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import { reset } from "redux-form";
import SelectedPrivacy from "@model/SelectedPrivacyModel";
import { selectedPrivacyNativeToken, selectedPrivacyToken } from "@redux/selectedPrivacy/selectedPrivacy.selectors";
import { defaultAccountSelector } from "@redux/account/account.selectors";
import { sendSelector } from "@module/Send/Send.selector";
import { actionFetchedMaxNativeFee, actionFetchedMaxPTokenFee, actionInit } from "@module/Send/Send.actions";
import format from "@utils/format";
import convert from "@utils/convert";
import { FORM_CONFIGS } from "./Send.constant";
import { AppThunkDispatch } from "@redux/store";

export interface TInnerInit {
  isInitingForm: boolean;
}

const enhanceInit = (WrappedComp: React.FunctionComponent) => (props: any) => {
  const dispatch: AppThunkDispatch = useDispatch();
  const [init, setInit] = React.useState(false);
  const selectedPrivacy: SelectedPrivacy = useSelector(selectedPrivacyToken);
  const send = useSelector(sendSelector);
  const account = useSelector(defaultAccountSelector);
  const { amount: prvAmount, pDecimals: prvPDecimals } = useSelector(selectedPrivacyNativeToken);
  const tokenAmount: number = selectedPrivacy?.amount;

  const isInitingForm = !selectedPrivacy || !send.init || !init;

  const handleFetchedMaxNativeFee = async ({
    nativeFee,
    nativePDecimals,
  }: {
    nativeFee: number;
    nativePDecimals: number;
  }) =>
    dispatch(
      actionFetchedMaxNativeFee({
        maxFeePrv: nativeFee,
        maxFeePrvText: format.toFixed({
          number: convert.toHumanAmount({
            originalAmount: nativeFee,
            decimals: nativePDecimals,
          }),
          decimals: nativePDecimals,
        }),
      }),
    );

  const handleFetchedMaxFeePToken = async ({ pToken }: { pToken: SelectedPrivacy }) =>
    pToken.isToken &&
    dispatch(
      actionFetchedMaxPTokenFee({
        amount: pToken.amount,
        amountText: format.toFixed({
          number: convert.toHumanAmount({
            originalAmount: pToken.amount,
            decimals: pToken.pDecimals,
          }),
          decimals: pToken.pDecimals,
        }),
      }),
    );

  const initData = async () => {
    if (init) {
      return;
    }

    console.log("SANG TEST::: ", { prvAmount, selectedPrivacy });
    try {
      setInit(false);
      batch(() => {
        dispatch(reset(FORM_CONFIGS.formName));
        dispatch(actionInit());
        handleFetchedMaxNativeFee({ nativeFee: prvAmount, nativePDecimals: prvPDecimals });
        handleFetchedMaxFeePToken({ pToken: selectedPrivacy });
      });
    } catch (error) {
      console.log("INIT DATA ERROR: ", error);
    } finally {
      setInit(true);
    }
  };

  React.useEffect(() => {
    if (init && !!prvAmount) {
      handleFetchedMaxNativeFee({
        nativeFee: prvAmount,
        nativePDecimals: prvPDecimals,
      }).then();
    }
  }, [account, prvAmount, init]);

  React.useEffect(() => {
    if (init && !!tokenAmount) {
      handleFetchedMaxFeePToken({
        pToken: selectedPrivacy,
      }).then();
    }
  }, [tokenAmount, selectedPrivacy?.tokenId, init]);

  React.useEffect(() => {
    initData().then();
  }, [selectedPrivacy?.tokenId, account]);

  return <WrappedComp {...{ ...props, isInitingForm }} />;
};

export default enhanceInit;
