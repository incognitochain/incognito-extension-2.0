import { checkForError, createLogger } from "../../core/utils";
import { VersionedData } from "../../core/types";
import Storage from "@services/storage";

const log = createLogger("ingconito:store");

export default class LocalStore {
  public isSupported: boolean;
  public chromeLocalStorage: any;

  constructor() {
    this.chromeLocalStorage = chrome.storage.local;
    this.isSupported = !!this.chromeLocalStorage;
    if (!this.isSupported) {
      log("Storage local API not available.");
    }
  }

  /**
   *
   * @param {string} key
   * @param {any} value
   */
  async setItem(key: string, value: any) {
    const local = chrome.storage.local;
    return new Promise<void>((resolve, reject) => {
      local.set({ [key]: value }, () => {
        if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
        resolve();
      });
    });
  }

  /**
   *
   * @param { string || undefined || null} key
   */
  async getItem(key?: string) {
    const local = chrome.storage.local;
    return new Promise<any>((resolve, reject) => {
      if (!key) {
        local.get((result) => {
          if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
          resolve(result);
        });
      } else {
        local.get([key], (result) => {
          if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
          resolve(result[key]);
        });
      }
    });
  }

  async set(state: VersionedData): Promise<void> {
    return this._set(state);
  }

  async get(): Promise<VersionedData | undefined> {
    if (!this.isSupported) {
      return undefined;
    }
    const result = await this._get();
    if (!result) {
      return undefined;
    }
    // extension.storage.local always returns an obj
    // if the object is empty, treat it as undefined
    if (isEmpty(result)) {
      return undefined;
    } else {
      return result;
    }
  }

  async getData(): Promise<VersionedData | undefined> {
    if (!this.isSupported) {
      return undefined;
    }
    const result = await this.getItem();
    if (!result) {
      return undefined;
    }
    // extension.storage.local always returns an obj
    // if the object is empty, treat it as undefined
    if (isEmpty(result)) {
      return undefined;
    } else {
      return result;
    }
  }

  // async set(state: VersionedData): Promise<void> {
  //   return this._set(state);
  // }

  _get(): Promise<VersionedData | undefined> {
    const local = chrome.storage.local;
    return new Promise((resolve, reject) => {
      local.get(null, (/** @type {any} */ result) => {
        const err = checkForError();
        if (err) {
          reject(err);
        } else {
          resolve(result as any);
        }
      });
    });
  }

  async _set(obj: VersionedData): Promise<void> {
    const local = chrome.storage.local;
    const localData = await Storage.getItem();
    const cloneObject = { ...localData, data: obj.data, version: obj.version };
    return new Promise((resolve, reject) => {
      local.set(cloneObject, async () => {
        const err = checkForError();
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  logAll() {
    this.getItem().then((result: any) => console.log(result));
  }
}

function isEmpty(obj: any) {
  return Object.keys(obj).length === 0;
}
