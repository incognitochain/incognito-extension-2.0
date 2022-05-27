import { APP_PASSWORD_KEY, APP_PASS_PHRASE_CIPHER, APP_SALT_KEY } from "@constants/common";
import { CONSTANT_CONFIGS } from "@constants/index";
import { cachePromise, clearCache, getCache } from "@services/cache";
import Storage from "@services/storage";
import { cache } from "../cache";
const { Validator } = require("incognito-chain-web-js/build/wallet");
const sjcl = require("incognito-chain-web-js/lib/privacy/sjcl");
const { codec, misc } = require("incognito-chain-web-js/lib/privacy/sjcl");
const crypto = require("crypto");

/**
 * Definition interface for Passphrase.
 */
interface PassphraseProps {
  aesKey: string;
  password?: string;
}

/**
 * Clear Passpharse from Cache in the Runtime mode
 * @returns {void}
 */
const clearPasspharse = (): void => {
  clearCache(CONSTANT_CONFIGS.PASSPHRASE_WALLET_DEFAULT);
};

/**
 * Get Passpharse from Storage has been ecrypted with sjcl algorithm
 * @returns {string} - JSON
 */
const getPasspharseFromStorage = async (): Promise<void> => {
  return await Storage.getItem(APP_PASS_PHRASE_CIPHER);
};

/**
 * save Passpharse to LocalStorage by using sjcl algorithms with hash aeskey
 * decrypt the cipherText using the symmetric algorithm with the aeskey
 * @param aesKeyString string
 * @param mnemonic string
 * @param password string
 * @returns {Promise<boolean | Error>}
 */
const savePasspharseToStorage = async (aesKeyString: string, mnemonic: string, password: string): Promise<boolean> => {
  try {
    const passpharseJSON = JSON.stringify({
      mnemonic,
      password,
    });
    const passpharseCipherText = sjcl.encrypt(sjcl.codec.hex.toBits(aesKeyString), passpharseJSON);
    await Storage.setItem(APP_PASS_PHRASE_CIPHER, passpharseCipherText);
    return Promise.resolve(true);
  } catch (error) {
    return Promise.resolve(false);
  }
};

/**
 * Cache Password in the Runtime mode.
 * @returns {void}
 */
const cachePassword = (password: string): void => {
  try {
    new Validator("cachePassword-password", password).required().string();
    cache(APP_PASSWORD_KEY, password);
  } catch (error) {
    throw error;
  }
};

const getPasswordFromCache = (): string => {
  try {
    return getCache(APP_PASSWORD_KEY);
  } catch (error) {
    throw error;
  }
};

/**
 * Create a new salt from random byte
 * @param {number} bytes can be 16, 32, 64 bytes... Default value: 16
 * @returns - string -  random string based on Bytes in hex
 */
const createNewSalt = (bytes: number = 16): string => {
  return crypto.randomBytes(bytes).toString("hex");
};
/**
 *
 * @returns Promise<string | undefined>
 */
const getSaltFromStorage = async (): Promise<string | undefined> => {
  return await Storage.getItem(APP_SALT_KEY);
};

/**
 * Get aes key from salt with pbkdf2 algorithm
 * @returns string
 */
const getAesKeyFromSalt = ({ salt, password }: { salt: string; password: string }): string => {
  try {
    new Validator("getAesKeyFromSalt-salt", salt).string();
    new Validator("getAesKeyFromSalt-password", password).required().string();
    let aesKey = misc.pbkdf2(password, salt, null, 128);
    aesKey = codec.hex.fromBits(aesKey);
    return aesKey;
  } catch (error) {
    throw error;
  }
};

/**
 * Get Passphrase with Password
 * @param {string | undefined} password
 * @returns  Promise<PassphraseProps>
 */
const getPassphraseNoCache = async (): Promise<PassphraseProps> => {
  try {
    let salt = await getSaltFromStorage();
    if (!salt) {
      salt = createNewSalt();

      //save Salt to Local Storage
      Storage.setItem(APP_SALT_KEY, salt);
    }
    const password = await getCache(APP_PASSWORD_KEY);
    const aesKey = getAesKeyFromSalt({ salt, password });

    return {
      aesKey,
      password,
    };
  } catch (e) {
    console.log("[ERROR] getPassphrase ", e);
    throw e;
  }
};

/**
 * Check if the password is valid or not by
 * decrypt the cipherText using the symmetric algorithm with the aeskey
 * @param password string
 * @returns {Promise<boolean | Error>}
 */
const checkPasswordValid = async (password: string): Promise<boolean | Error> => {
  try {
    const salt = await getSaltFromStorage();
    const passPhraseEcrypted = await getPasspharseFromStorage();
    const aesKeyBuffer = misc.pbkdf2(password, salt, null, 128);
    const aesKeyString = codec.hex.fromBits(aesKeyBuffer) as string;
    sjcl.decrypt(sjcl.codec.hex.toBits(aesKeyString), passPhraseEcrypted);
    return Promise.resolve(true);
  } catch (e) {
    return Promise.reject(new Error("Password Invalid!"));
  }
};

const decryptPasspharse = async (password: string): Promise<any | Error> => {
  try {
    const salt = await getSaltFromStorage();
    const passPhraseEcrypted = await getPasspharseFromStorage();
    const aesKeyBuffer = misc.pbkdf2(password, salt, null, 128);
    const aesKeyString = codec.hex.fromBits(aesKeyBuffer) as string;
    const passPhraseDecrypted = sjcl.decrypt(sjcl.codec.hex.toBits(aesKeyString), passPhraseEcrypted);
    return Promise.resolve(passPhraseDecrypted);
  } catch (e) {
    return Promise.reject(new Error("Password Invalid!"));
  }
};

/**
 *
 * @param password string | undefined
 * @returns
 */
const getPassphrase = (): Promise<PassphraseProps> =>
  cachePromise(CONSTANT_CONFIGS.PASSPHRASE_WALLET_DEFAULT, () => getPassphraseNoCache(), 1e9);

export {
  cachePassword,
  getPasswordFromCache,
  savePasspharseToStorage,
  checkPasswordValid,
  getPasspharseFromStorage,
  getPassphrase,
  getPassphraseNoCache,
  getSaltFromStorage,
  clearPasspharse,
  createNewSalt,
  decryptPasspharse,
};
