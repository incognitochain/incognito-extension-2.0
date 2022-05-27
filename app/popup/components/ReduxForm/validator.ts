import BigNumber from "bignumber.js";
import isEmpty from "lodash/isEmpty";
import convert from "@popup/utils/convert";
import format from "@popup/utils/format";
const { keyServices } = require("incognito-chain-web-js/build/web/wallet");

const isSafeInteger = (number: number) => Math.abs(number) <= Number.MAX_SAFE_INTEGER;

const required = (value: any) => (isEmpty(value) ? "Required" : undefined);

const maxLength = (max: number, message?: string) => (value: string) =>
  value && value.length > max ? message || `Must be ${max} characters or less` : undefined;

const minLength = (min: number, message?: string) => (value: string) =>
  value && value.length < min ? message || `Must be ${min} characters or more` : undefined;

const isInteger = (value: string) =>
  value && !new BigNumber(value).isInteger() ? "Must be a integer number" : undefined;

const number = (value: string) => {
  const bn = new BigNumber(value);
  if (bn.isNaN()) {
    return "Must be a number";
  }
  if (value && !isSafeInteger(bn.toNumber())) {
    return "This number is too large!";
  }
  return undefined;
};

const minValue = (min: number, message?: string) => (value: string) =>
  value && convert.toNumber({ text: value }) < min ? message || `Must be at least ${format.number(min)}` : undefined;

const maxValue = (max: number, message?: string) => (value: string) =>
  value && convert.toNumber({ text: value }) > max
    ? message || `Must be less than or equal ${format.number(max)}`
    : undefined;

const largerThan = (min: number, message?: string) => (value: string) =>
  value && convert.toNumber({ text: value }) <= min
    ? message || `Must be larger than ${format.number(min)}`
    : undefined;

const email = (message?: string) => (value: string) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? message || "Invalid email address" : undefined;

const regexp =
  (pattern: RegExp, message = "Invalid data") =>
  (value: string) =>
    pattern && !pattern.test(value) ? message : undefined;

const incognitoAddress = (message?: string) => (value: string) => {
  if (value?.length < 15 || !keyServices.checkPaymentAddress(value)) {
    return message || "Invalid address";
  }
  if (value && !keyServices.checkPaymentAddress(value)) {
    return message || "Use Unshield to exit Incognito";
  }
  return undefined;
};

const combinedAmount = [required, number, largerThan(0, "Please enter an amount greater than 0")];

const combinedNanoAmount = [required, isInteger, number, minValue(1, "Please enter an amount greater than 1.")];

const combinedIncognitoAddress = [required, incognitoAddress()];
const combinedUnknownAddress = [required, minLength(15)];

const combinedAccountName = [
  required,
  minLength(1),
  maxLength(50),
  regexp(/\w+$/i, 'Please use a valid account name (Ex: "Cat, Account-1,..").'),
];

const address = () => {
  return "Invalid address";
};

const combineInvalidAddress = [required, address];

const NAME_PATTERN = /^[A-Za-z0-9]*$/;

const validateAlphaNumericText = (message?: string) => (value: any) => {
  return !NAME_PATTERN.test(value) ? message : undefined;
};

const validator = {
  validateAlphaNumericText,
  minLength,
  maxLength,
  required,
  maxValue,
  minValue,
  address,
  combinedAmount,
  combinedAccountName,
  combinedNanoAmount,
  combineInvalidAddress,
  combinedIncognitoAddress,
  combinedUnknownAddress,
  email,
};

export default validator;
