import BigNumber from "bignumber.js";
import debounce from "lodash/debounce";
import React from "react";
import { useSelector } from "react-redux";
import convert from "@utils/convert";
import { validator } from "@components/ReduxForm";
// import { ISendData } from "./Send.types";
import { sendDataSelector } from "./Send.selector";

export interface TInner {
  validateAmount: () => any;
}

interface IState {
  maxAmountValidator: any;
  minAmountValidator: any;
}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: any) => {
  // const sendData: ISendData = useSelector(sendDataSelector);
  // const selectedPrivacy: ISelectedPrivacy = useSelector(selectedPrivacySelector);
  // const popularCoinsIds = useSelector(popularCoinIdsSelector);
  // const { fee, feeUnitByTokenId, minAmount, maxAmount, maxAmountText, minAmountText, isIncognitoAddress } = sendData;
  // const initialState: IState = {
  //   maxAmountValidator: undefined,
  //   minAmountValidator: undefined,
  // };
  // const [state, setState] = React.useState({ ...initialState });
  // const { maxAmountValidator, minAmountValidator } = state;
  // const setFormValidator = debounce(async () => {
  //   const maxAmountNum = convert.toNumber({
  //     text: maxAmountText,
  //     autoCorrect: true,
  //   });
  //   const minAmountNum = convert.toNumber({
  //     text: minAmountText,
  //     autoCorrect: true,
  //   });
  //   let currentState = { ...state };
  //   if (Number.isFinite(maxAmountNum)) {
  //     currentState = {
  //       ...state,
  //       maxAmountValidator: validator.maxValue(
  //         maxAmountNum,
  //         new BigNumber(maxAmountNum).toNumber() > 0
  //           ? `Max amount you can ${isIncognitoAddress ? "send" : "unshield"} is ${maxAmountText} ${
  //               selectedPrivacy?.symbol || selectedPrivacy?.pSymbol
  //             }`
  //           : "Your balance is insufficient.",
  //       ),
  //     };
  //     await setState(currentState);
  //   }
  //   if (Number.isFinite(minAmountNum)) {
  //     await setState({
  //       ...currentState,
  //       minAmountValidator: validator.minValue(
  //         minAmountNum,
  //         `Amount must be larger than ${minAmountText} ${selectedPrivacy?.symbol || selectedPrivacy?.pSymbol}`,
  //       ),
  //     });
  //   }
  // }, 200);
  //
  // const getAmountValidator = () => {
  //   const val = [];
  //   if (minAmountValidator) val.push(minAmountValidator);
  //   if (maxAmountValidator) val.push(maxAmountValidator);
  //   if (selectedPrivacy?.isIncognitoToken || popularCoinsIds.NEO === selectedPrivacy.tokenId) {
  //     val.push(...validator.combinedNanoAmount);
  //   }
  //   val.push(...validator.combinedAmount);
  //   const values = Array.isArray(val) ? [...val] : [val];
  //   return values;
  // };
  //
  // React.useEffect(() => {
  //   setFormValidator();
  // }, [selectedPrivacy, fee, feeUnitByTokenId, maxAmount, minAmount]);
  //
  // const validateAmount: any[] = getAmountValidator();

  return (
    <WrappedComponent
      {...{
        ...props,
        // validateAmount,
      }}
    />
  );
};

export default enhance;
