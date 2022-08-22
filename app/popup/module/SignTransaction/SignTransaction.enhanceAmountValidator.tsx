import React from "react";
import debounce from "lodash/debounce";
import convert from "@utils/convert";
import { validator } from "@components/ReduxForm";
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
  const { selectedPrivacy, maxInputAmountText } = props;

  const initialState: IState = {
    maxAmountValidator: undefined,
    minAmountValidator: undefined,
  };

  const [state, setState] = React.useState({ ...initialState });
  const { maxAmountValidator, minAmountValidator } = state;

  const setFormValidator = debounce(async () => {
    const maxAmountNum = convert.toNumber({
      text: maxInputAmountText,
      autoCorrect: true,
    });

    let currentState = { ...state };
    if (Number.isFinite(maxAmountNum)) {
      currentState = {
        ...state,
        maxAmountValidator: validator.maxValue(
          maxAmountNum,
          new BigNumber(maxAmountNum).toNumber() > 0
            ? `Max amount you can send is ${maxInputAmountText} ${selectedPrivacy?.symbol}`
            : "Your balance is insufficient.",
        ),
      };
      await setState(currentState);
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
  }, [selectedPrivacy]);

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
