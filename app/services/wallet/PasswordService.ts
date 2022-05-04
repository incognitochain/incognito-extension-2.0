// /* eslint-disable import/no-cycle */
// import { CONSTANT_CONFIGS, CONSTANT_KEYS } from "@src/constants";
// import { cachePromise } from "@src/services/cache";
// import storage from "@src/services/storage";
// import { getItemAsync, setItemAsync } from "expo-secure-store";
// import { byteToHexString, Validator } from "incognito-chain-web-js/build/wallet";
// import { codec, misc } from "incognito-chain-web-js/lib/privacy/sjcl";
// import isEqual from "lodash/isEqual";
// import { randomBytes } from "react-native-randombytes";

// const PASSWORD_DURATION_IN_MS = 7 * 24 * 3600 * 1000; // 7 days
// const SUPPORT_EXPORT_SECURE_STORAGE_KEY = "SUPPORT_EXPORT_SECURE_STORAGE_KEY";

// export function clearPassword() {
//   storage.removeItem(CONSTANT_KEYS.PASSPHRASE_KEY);
// }

// export const getAesKeyFromSalt = ({ salt, password }) => {
//   try {
//     new Validator("getAesKeyFromSalt-salt", salt).string();
//     new Validator("getAesKeyFromSalt-password", password).required().string();
//     console.log("[getAesKeyFromSalt] ", {
//       salt,
//       password,
//     });

//     console.info("[getAesKeyFromSalt] SIZe Bits salt ", new Blob([salt]).size);

//     let aesKey = misc.pbkdf2(password, salt, null, 128);
//     console.info("[getAesKeyFromSalt] aesKey ", typeof aesKey);
//     console.info("[getAesKeyFromSalt] SIZe aesKey ", new Blob([aesKey]).size);
//     console.log("[getAesKeyFromSalt] before aesKey ", Object.assign({}, aesKey));

//     aesKey = codec.hex.fromBits(aesKey);

//     console.log("[getAesKeyFromSalt] after aesKey ", aesKey);

//     return aesKey;
//   } catch (error) {
//     console.log("getAesKeyFromSalt error", error);
//     throw error;
//   }
// };

// export const checkSupportExpoSecureStore = async ({ accessKey, password }) => {
//   console.log("[checkSupportExpoSecureStore] .... ");
//   console.log("[checkSupportExpoSecureStore] ", { accessKey, password });

//   let isSupportSecure = false;
//   try {
//     isSupportSecure = await storage.getItem(SUPPORT_EXPORT_SECURE_STORAGE_KEY);

//     console.log("[checkSupportExpoSecureStore][A] isSupportSecure ", isSupportSecure);

//     new Validator("checkSupportExpoSecureStore-accessKey", accessKey).required().string();
//     new Validator("checkSupportExpoSecureStore-password", password).required().string();
//     if (typeof isSupportSecure === "undefined" || isSupportSecure === null) {
//       let salt = await getItemAsync(accessKey);
//       const AAA = randomBytes(32);
//       console.info("[getAesKeyFromSalt]AAA ", new Blob([AAA]).size);
//       console.log("[checkSupportExpoSecureStore] typeof salt ", typeof salt);
//       console.log("[checkSupportExpoSecureStore] salt ", salt);

//       if (!salt) {
//         // generate a new wallet encryption key
//         const raw = randomBytes(16);

//         console.log("[checkSupportExpoSecureStore] raw ", raw);

//         salt = byteToHexString(raw);

//         console.log("[checkSupportExpoSecureStore][T] salt ", salt);

//         await setItemAsync(accessKey, salt);
//       }
//       let aesKey = getAesKeyFromSalt({ salt, password });
//       let reCheckSalt = await getItemAsync(accessKey);
//       let reCheckAesKey = getAesKeyFromSalt({ salt: reCheckSalt, password });

//       console.log("[checkSupportExpoSecureStore] aesKey ", aesKey);
//       console.log("[checkSupportExpoSecureStore] reCheckSalt ", reCheckSalt);
//       console.log("[checkSupportExpoSecureStore] reCheckAesKey ", reCheckAesKey);

//       isSupportSecure = isEqual(aesKey, reCheckAesKey);
//       console.log("[checkSupportExpoSecureStore] isSupportSecure ", isSupportSecure);
//       await storage.setItem(SUPPORT_EXPORT_SECURE_STORAGE_KEY, JSON.stringify(isSupportSecure));

//       console.log("[checkSupportExpoSecureStore][B] ===> ", isSupportSecure);

//       return isSupportSecure;
//     }
//   } catch (error) {
//     console.log("error accessing SecureStorage", error);
//   }

//   console.log("[checkSupportExpoSecureStore][C] ===> ", isSupportSecure);
//   return isSupportSecure;
// };

// export const getPassphraseNoCache = async () => {
//   console.log("[getPassphraseNoCache] .... ");
//   // TODO : password expiry
//   let password = CONSTANT_CONFIGS.PASSPHRASE_WALLET_DEFAULT;

//   console.log("[getPassphraseNoCache] password ", typeof password);
//   console.log("[getPassphraseNoCache] password ", password);

//   if (password === "undefined") {
//     console.log("AAAAAAAAAA");
//   }

//   if (password === undefined) {
//     console.log("BBBBBBBBB");
//   }

//   const accessKey = CONSTANT_KEYS.SALT_KEY || "default-wallet-salt";

//   console.log("[getPassphraseNoCache] accessKey ", accessKey);

//   try {
//     const checkSupport = await checkSupportExpoSecureStore({
//       accessKey,
//       password,
//     });

//     console.log("[getPassphraseNoCache] checkSupport ", checkSupport);

//     if (checkSupport) {
//       const salt = await getItemAsync(accessKey);

//       console.log("[getPassphraseNoCache] salt ", salt);

//       const aesKey = getAesKeyFromSalt({ salt, password });

//       console.log("[getPassphraseNoCache] aesKey ", aesKey);

//       return {
//         aesKey,
//         password,
//       };
//     } else {
//       let salt = await storage.getItem(accessKey);

//       console.log("[getPassphraseNoCache][2] salt ", salt);

//       if (!salt) {
//         // generate a new wallet encryption key
//         const raw = randomBytes(16);
//         salt = byteToHexString(raw);

//         console.log("[getPassphraseNoCache][2] raw ", raw);
//         console.log("[getPassphraseNoCache][3] salt ", salt);
//         await storage.setItem(accessKey, salt);
//       }
//       const aesKey = getAesKeyFromSalt({ salt, password });

//       console.log("[getPassphraseNoCache][2] aesKey ", aesKey);

//       console.log("[getPassphraseNoCache] Result ", {
//         aesKey,
//         password,
//       });

//       return {
//         aesKey,
//         password,
//       };
//     }
//   } catch (e) {
//     console.log("error getPassphrase ", e);
//     throw e;
//   }
// };

// export const getPassphrase = () =>
//   cachePromise("PASSPHRASE_WALLET_DEFAULT", () => getPassphraseNoCache(), 1e9);

export default {};
