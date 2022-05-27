export interface ILanguage {
  [key: string]: any;
  error: IErrorLanguage;
}

export interface IErrorLanguage {
  invalidMasterKeyName: string;
  invalidMnemonic: string;
  tokenIdRequired: string;
  invalidPassword: string;
  invalidPasswordLength: string;
}
