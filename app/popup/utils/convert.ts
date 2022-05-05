import { Separator } from '@popup/utils';
import BigNumber from 'bignumber.js';
import _toNumber from 'lodash/toNumber';

const checkAmount = (amount: number) => {
  if (!Number.isFinite(amount)) throw new Error('Can not format invalid amount');
};

const removeTrailingZeroes = (amountString: string) => {
  let formattedString = amountString;
  while (
    formattedString.length > 0 &&
    ((formattedString.includes(Separator.getDecimalSeparator()) &&
      formattedString[formattedString.length - 1] === '0') ||
      formattedString[formattedString.length - 1] === Separator.getDecimalSeparator())
  ) {
    formattedString = formattedString.slice(0, formattedString.length - 1);
  }

  return formattedString;
};

const replaceDecimals = ({
  text,
  autoCorrect = false,
}: {
  text: any;
  autoCorrect?: boolean;
}) => {
  if (
    Separator.getDecimalSeparator() === ',' &&
    !text?.includes?.('e+') &&
    !text?.includes?.('e-')
  ) {
    text = text.replace(/\./g, '_');
    text = text.replace(/,/g, '.');
    text = text.replace(/_/g, ',');
  }

  if (autoCorrect) {
    text = text.replace(/,/g, '');
  }

  return text;
};

const getDecimalsFromHumanAmount = ({
  humanAmount,
  defaultDecimals,
}: {
  humanAmount: any;
  defaultDecimals: number;
}) => {
  let decimals;
  if (humanAmount > 10) {
    decimals = 2;
  } else if (humanAmount > 1) {
    decimals = 3;
  } else if (humanAmount > 1e-4) {
    decimals = 4;
  } else if (humanAmount > 1e-5) {
    decimals = 5;
  } else {
    decimals = Math.max(defaultDecimals, 6);
  }
  return decimals;
};

const toNumber = ({
  text,
  autoCorrect = false,
}: {
  text: any;
  autoCorrect?: boolean;
}) => {
  const number = replaceDecimals({ text, autoCorrect });
  return _toNumber(number);
};

const toOriginalAmount = ({
  humanAmount,
  decimals,
  round = true,
}: {
  humanAmount: any;
  decimals: number;
  round?: boolean;
}) => {
  let originalAmount = 0;
  try {
    const amount = toNumber({ text: humanAmount });
    checkAmount(amount);
    // Use big number to solve float calculation problem
    // For example: 0.5000001 * 1e9 = 500000099.99999994
    // The result should be 500000100
    const decision_rate = Number(decimals) ? 10 ** Number(decimals) : 1;
    if (round) {
      return Math.floor(
        new BigNumber(amount).multipliedBy(new BigNumber(decision_rate)).toNumber(),
      );
    }
    originalAmount = new BigNumber(amount)
      .multipliedBy(new BigNumber(decision_rate))
      .toNumber();
  } catch (error) {
    originalAmount = 0;
    console.log('toOriginalAmount-error', error);
  }
  return originalAmount;
};

const toHumanAmount = ({
  originAmount,
  decimals,
}: {
  originAmount: any;
  decimals: number;
}) => {
  try {
    if (!originAmount) {
      return 0;
    }
    const amount = new BigNumber(originAmount).dividedBy(
      new BigNumber('10').pow(Number(decimals) ? decimals : 0),
    );
    if (amount.isNaN()) {
      return 0;
    }
    return amount.toNumber();
  } catch (error) {
    console.log('CONVERT TO HUMAN AMOUNT ERROR', originAmount, decimals);
    return 0;
  }
  /**
   *
   * @param {number} humanAmount
   * @param {number} decimals
   * @param {boolean} round
   * Convert human readable amount (display on frontend) to original amount
   */
};

const amountVer2 = ({ amount, decimals }: { amount: any; decimals: number }) => {
  try {
    const fmt = {
      decimalSeparator: Separator.getDecimalSeparator(),
      groupSeparator: Separator.getGroupSeparator(),
      groupSize: 3,
    };
    let _amount = toHumanAmount({ originAmount: amount, decimals: decimals });
    const _decimals = getDecimalsFromHumanAmount({
      humanAmount: _amount,
      defaultDecimals: decimals,
    });
    return _amount
      ? removeTrailingZeroes(
          new BigNumber(_amount).toFormat(_decimals, BigNumber.ROUND_DOWN, fmt),
        )
      : 0;
  } catch (e) {
    return amount;
  }
};

export const formatPrice = ({
  price,
  convertToNumber = false,
}: {
  price: any;
  convertToNumber?: boolean;
}) => {
  const pDecimals = 9;
  const originalAmount: any =
    toOriginalAmount({ humanAmount: price, decimals: pDecimals, round: true }) || 0;
  const result = amountVer2({ amount: originalAmount, decimals: pDecimals });
  return convertToNumber ? toNumber({ text: result, autoCorrect: true }) : result;
};

export default { toOriginalAmount, formatPrice, amountVer2 };
