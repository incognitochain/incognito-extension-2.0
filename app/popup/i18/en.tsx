import { ILanguage } from "./interface";

const language: ILanguage = {
  searchCoin: "Search coins",
  error: {
    tokenIdRequired: "Token id is required",
    invalidMnemonic: "That’s not quite right",
    invalidMasterKeyName: "Master key names must be alphanumeric. Please choose another.",
    invalidPassword: "That’s not quite right.",
    invalidPasswordLength: "Please provide a password of at least 10 characters",
  },
};

export default language;
