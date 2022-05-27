const { Validator } = require("incognito-chain-web-js/build/wallet");
const sjcl = require("incognito-chain-web-js/lib/privacy/sjcl");

const encryptData = (dataJSON: string, aesKey: string): string => {
  new Validator("encryptData-dataJSON", dataJSON).required().string();
  new Validator("encryptData-aesKey", aesKey).required().string();
  return sjcl.encrypt(sjcl.codec.hex.toBits(aesKey), dataJSON);
};
const decryptData = (dataJSON: string, aesKey: string): string => {
  new Validator("decryptData-dataJSON", dataJSON).required().string();
  new Validator("decryptData-aesKey", aesKey).required().string();
  return sjcl.decrypt(sjcl.codec.hex.toBits(aesKey), dataJSON);
};

export default {
  encryptData,
  decryptData,
};
