import BigNumber from "bignumber.js";
import format from "@utils/format";
import { getDecimalSeparator } from "@popup/utils/separator";

const checkAmount = (amount: number) => {
  if (!Number.isFinite(amount)) throw new Error("Can not format invalid amount");
};

const replaceDecimals = ({ text, autoCorrect = false }: { text: string; autoCorrect?: boolean }) => {
  let result = text;
  const decimalSeparator = getDecimalSeparator();
  if (typeof result !== "string") {
    return result;
  }
  if (decimalSeparator === "," && !result?.includes?.("e+") && !result?.includes?.("e-")) {
    result = result.replace(/\./g, "_");
    result = result.replace(/,/g, ".");
    result = result.replace(/_/g, ",");
  }
  if (autoCorrect) {
    result = result.replace(/,/g, "");
  }
  return result;
};

interface IHunmanAmount {
  originalAmount?: number;
  decimals: number;
}

const toHumanAmount = (payload: IHunmanAmount) => {
  const { originalAmount = 0, decimals } = payload;
  const amount = new BigNumber(originalAmount);
  if (amount.isNaN()) {
    return 0;
  }
  const indexNumber = new BigNumber(10).pow(decimals);
  return amount.dividedBy(indexNumber).toNumber();
};

const toHumanAmountString = (payload: IHunmanAmount) => {
  return format.toFixed({
    number: toHumanAmount({
      originalAmount: payload.originalAmount || 0,
      decimals: payload.decimals,
    }),
    decimals: payload.decimals,
  });
};

const toOriginalAmount = ({
  humanAmount,
  decimals,
  round = true,
}: {
  humanAmount: string;
  decimals: number;
  round?: boolean;
}) => {
  let amount = 0;
  try {
    const amountRepDecimals = replaceDecimals({
      text: humanAmount,
    });
    const bnAmount = new BigNumber(amountRepDecimals);
    if (bnAmount.isNaN()) {
      return 0;
    }
    const indexNumber = new BigNumber(10).pow(decimals || 0).toNumber();
    amount = bnAmount.multipliedBy(new BigNumber(indexNumber)).toNumber();
    if (round) {
      amount = Math.floor(amount);
    }
  } catch (error) {
    amount = 0;
    throw error;
  }
  return amount;
};

const toNumber = ({ text, autoCorrect = true }: { text: string; autoCorrect?: boolean }) => {
  const number = replaceDecimals({
    text,
    autoCorrect,
  });
  return new BigNumber(number).toNumber();
};

const toString = ({ text, autoCorrect = true }: { text: string; autoCorrect?: boolean }) => {
  const number = replaceDecimals({
    text,
    autoCorrect,
  });
  return new BigNumber(number).toString();
};

const convert = {
  checkAmount,
  replaceDecimals,
  toHumanAmount,
  toHumanAmountString,
  toOriginalAmount,
  toNumber,
  toString,
};

export default convert;
