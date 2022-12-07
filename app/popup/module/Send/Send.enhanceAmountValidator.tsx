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
  const [amountValue, setAmountValue] = React.useState("");
  const [amountError, setAmountError] = React.useState<any>(undefined);

  let { selectedPrivacy, maxAmountText, isSend, minAmountText, inputAmount } = sendData;
  inputAmount = amountValue;
  const initialState: IState = {
    maxAmountValidator: undefined,
    minAmountValidator: undefined,
  };
  const [state, setState] = React.useState({ ...initialState });
  const { maxAmountValidator, minAmountValidator } = state;

  const onAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmountValue(event.target.value);
  };

  const onAmountBlur = () => {
    if (!amountValue || amountValue.length < 1) {
      setAmountError("Required");
    }
  };

  const onAmountMaxClicked = () => {
    setAmountValue(maxAmountText);
  };

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

  React.useEffect(() => {
    let amountErrorTmp = undefined;
    const maxAmountNum = convert.toNumber({
      text: maxAmountText,
      autoCorrect: true,
    });

    const minAmountNum = convert.toNumber({
      text: minAmountText,
      autoCorrect: true,
    });
    const inputAmountNum = convert.toNumber({
      text: amountValue,
      autoCorrect: true,
    });

    // console.log("maxAmountNum ", maxAmountNum);
    // console.log("minAmountNum ", minAmountNum);
    // console.log("inputAmountNum ", inputAmountNum);

    if (Number.isFinite(maxAmountNum) && Number.isFinite(minAmountNum)) {
      const maxAmountNumObj = new BigNumber(maxAmountNum).toNumber();
      const minAmountNumObj = new BigNumber(minAmountNum).toNumber();
      const inputAmountNumObj = new BigNumber(inputAmountNum).toNumber();

      // console.log("maxAmountNumObj ", maxAmountNumObj);
      // console.log("minAmountNumObj ", minAmountNumObj);
      // console.log("inputAmountNumObj ", inputAmountNumObj);

      if (inputAmountNumObj > maxAmountNumObj) {
        amountErrorTmp = `Max amount you can ${isSend ? "send" : "unshield"} is ${maxAmountText} ${
          selectedPrivacy?.symbol
        }`;
      } else if (inputAmountNumObj < minAmountNumObj) {
        amountErrorTmp = `Amount must be larger than ${minAmountText} ${selectedPrivacy?.symbol}`;
      } else if (inputAmountNumObj < 0 || maxAmountNumObj < 0) {
        amountErrorTmp = "Your balance is insufficient.";
      } else {
        amountErrorTmp = undefined;
      }
      setAmountError(amountErrorTmp);
    }
  }, [amountValue, sendData.selectedPrivacy.amount, maxAmountText, minAmountText, selectedPrivacy?.symbol]);

  const validateAmount: any[] = getAmountValidator();

  return (
    <WrappedComponent
      {...{
        ...props,
        validateAmount,
        onAmountChange,
        onAmountBlur,
        onAmountMaxClicked,
        amountValue,
        amountError,
      }}
    />
  );
};

export default enhance;
