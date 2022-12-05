import React from "react";
import { useSelector } from "react-redux";
import { validator } from "@components/ReduxForm";
import { sendDataSelector } from "./Send.selector";
import { ISendData } from "@module/Send/Send.types";
import convert from "@utils/convert";
import debounce from "lodash/debounce";
import BigNumber from "bignumber.js";
import { detectToken } from "@utils/misc";

export interface TInner {
  validateAmount: () => any;
}

interface IState {
  maxAmountValidator: any;
  minAmountValidator: any;
}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: any) => {
  const sendData: ISendData = useSelector(sendDataSelector);
  const { selectedPrivacy, maxAmountText, isSend, minAmountText, inputAmount } = sendData;

  const initialState: IState = {
    maxAmountValidator: undefined,
    minAmountValidator: undefined,
  };

  const [state, setState] = React.useState({ ...initialState });
  const { maxAmountValidator, minAmountValidator } = state;

  const setFormValidator = debounce(async () => {
    const maxAmountNum = convert.toNumber({
      text: maxAmountText,
      autoCorrect: true,
    });

    const minAmountNum = convert.toNumber({
      text: minAmountText,
      autoCorrect: true,
    });

    let currentState = { ...state };
    if (Number.isFinite(maxAmountNum)) {
      currentState = {
        ...state,
        maxAmountValidator: validator.maxValue(
          maxAmountNum,
          new BigNumber(maxAmountNum).toNumber() > 0
            ? `Max amount you can ${isSend ? "send" : "unshield"} is ${maxAmountText} ${selectedPrivacy?.symbol}`
            : "Your balance is insufficient.",
        ),
      };
      await setState(currentState);
    }

    if (Number.isFinite(minAmountNum)) {
      await setState({
        ...currentState,
        minAmountValidator: validator.minValue(
          minAmountNum,
          `Amount must be larger than ${minAmountText} ${selectedPrivacy?.symbol}`,
        ),
      });
    }
  }, 200);

  const getAmountValidator = () => {
    const val = [];
    if (minAmountValidator) val.push(minAmountValidator);
    if (maxAmountValidator) val.push(maxAmountValidator);
    if (selectedPrivacy?.isIncognitoToken || detectToken.ispNEO(selectedPrivacy.tokenId)) {
      val.push(...validator.combinedNanoAmount);
    }
    val.push(...validator.combinedAmount);
    return [...val];
  };

  React.useEffect(() => {
    setFormValidator();
  }, [sendData.selectedPrivacy.amount, maxAmountText, selectedPrivacy?.symbol, inputAmount]);

  const validateAmount: any[] = getAmountValidator();

  return (
    <WrappedComponent
      {...{
        ...props,
        validateAmount,
      }}
    />
  );
};

export default enhance;
