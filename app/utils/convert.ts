import _ from "lodash";
import { getDecimalSeparator } from "@resources/separator";
import BigNumber from "bignumber.js";
import format from "./format";

const checkAmount = (amount: any) => {
  if (!Number.isFinite(amount)) throw new Error("Can not format invalid amount");
};

const replaceDecimals = (text: any, autoCorrect = false) => {
  if (typeof text !== "string") {
    return text;
  }

  if (getDecimalSeparator() === "," && !text?.includes?.("e+") && !text?.includes?.("e-")) {
    text = text.replace(/\./g, "_");
    text = text.replace(/,/g, ".");
    text = text.replace(/_/g, ",");
  }

  if (autoCorrect) {
    text = text.replace(/,/g, "");
  }

  return text;
};

const toNumber = (text: any, autoCorrect = false) => {
  const number = replaceDecimals(text, autoCorrect);
  return _.toNumber(number);
};

export default {
  /**
   *
   * @param {number} originAmount
   * @param {number} decimals
   * Convert original amount (usualy get from backend) to human readable amount or display on frontend
   */
  toHumanAmount(originAmount: any, decimals: any) {
    try {
      if (!originAmount) {
        return 0;
      }
      const amount = new BigNumber(originAmount).dividedBy(
        new BigNumber("10").pow(Number(decimals) ? decimals : 0),
      );
      if (amount.isNaN()) {
        return 0;
      }
      return amount.toNumber();
    } catch (error) {
      console.log("CONVERT TO HUMAN AMOUNT ERROR", originAmount, decimals);
      return 0;
    }
    /**
     *
     * @param {number} humanAmount
     * @param {number} decimals
     * @param {boolean} round
     * Convert human readable amount (display on frontend) to original amount
     */
  },

  toOriginalAmount(humanAmount: any, decimals: any, round = true) {
    let originalAmount = 0;
    try {
      const amount = toNumber(humanAmount);
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
      originalAmount = new BigNumber(amount).multipliedBy(new BigNumber(decision_rate)).toNumber();
    } catch (error) {
      originalAmount = 0;
      // console.log('toOriginalAmount-error', error);
    }
    return originalAmount;
  },

  toRealTokenValue(tokens: any, tokenId: any, value: any) {
    const token = tokens.find((item: any) => item.id === tokenId);
    return value / Math.pow(10, token?.pDecimals || 0);
  },

  toNumber,

  toInput(text: any) {
    if (typeof text !== "string") {
      return text;
    }

    if (getDecimalSeparator() === ",") {
      text = text.replace(/\./g, "");
    }

    if (getDecimalSeparator() === ".") {
      text = text.replace(/,/g, "");
    }

    return text;
  },

  toHash(text: any) {
    let hash = 0,
      i,
      chr;
    if (text.length === 0) return "";
    for (i = 0; i < text.length; i++) {
      chr = text.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash.toString();
  },

  toPDecimals(number: any, token: any) {
    return new BigNumber(replaceDecimals(number, true))
      .dividedBy(new BigNumber(10).pow(token.decimals))
      .multipliedBy(new BigNumber(10).pow(token.pDecimals))
      .dividedToIntegerBy(1)
      .toNumber();
  },

  toDecimals(number: any, token: any) {
    return new BigNumber(replaceDecimals(number, true))
      .dividedBy(new BigNumber(10).pow(token.pDecimals))
      .multipliedBy(new BigNumber(10).pow(token.decimals))
      .dividedToIntegerBy(1)
      .toFixed(0);
  },
  toHumanAmountVer2(humanAmount: any, decimals: any) {
    let amount = 0;
    try {
      const originalAmount = this.toOriginalAmount(humanAmount, decimals);
      amount = format.amountVer2(originalAmount, decimals);
      amount = this.toNumber(amount, true);
    } catch (error) {
      console.log("amountFromHumanAmountV2-error", error);
    }
    return amount;
  },
};

export const formatTime = (seconds: any) => {
  let h: any = Math.floor(seconds / 3600),
    m: any = Math.floor(seconds / 60) % 60,
    s: any = seconds % 60;
  if (h < 10) h = "0" + h;
  if (m < 10) m = "0" + m;
  if (s < 10) s = "0" + s;
  return h + ":" + m + ":" + s;
};
