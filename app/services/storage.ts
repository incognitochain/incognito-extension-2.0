const Storage = {
  /**
   *
   * @param {string} key
   * @param {any} value
   */
  setItem(key: string, value: string) {
    const local = chrome.storage.local;
    return new Promise<void>((resolve, reject) => {
      local.set({ [key]: value }, () => {
        if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
        resolve();
      });
    });
  },

  /**
   *
   * @param { string || undefined || null} key
   */
  getItem(key?: string) {
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
  },

  /**
   *
   * @param {string} key
   */
  removeItem(key: string) {
    const local = chrome.storage.local;
    return new Promise<void>((resolve, reject) => {
      local.remove([key], () => {
        if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
        resolve();
      });
    });
  },

  /**
   *
   * @param {string} key
   */
  clear() {
    const local = chrome.storage.local;
    return new Promise<void>((resolve, reject) => {
      local.clear(() => {
        if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
        resolve();
      });
    });
  },

  logAll() {
    this.getItem().then((result: any) => console.log(result));
  },
};

export default Storage;
