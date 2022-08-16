const Storage = {
  /**
   * @param {string} key
   * @param {any} value
   */
  setItem(key: string, value: string) {
    return new Promise<void>((resolve, reject) => {
      const local = chrome.storage.local;
      local.set({ [key]: value }, () => {
        if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
        resolve();
      });
    });
  },

  /**
   * @param { string || undefined || null} key
   */
  getItem(key?: string) {
    return new Promise<any>((resolve, reject) => {
      const local = chrome.storage.local;

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
    return new Promise<void>((resolve, reject) => {
      const local = chrome.storage.local;

      local.remove([key], () => {
        if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
        resolve();
      });
    });
  },

  /**
   * @param {string} key
   */
  async clear() {
    return new Promise<void>((resolve, reject) => {
      const local = chrome.storage.local;
      local.clear(() => {
        if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
        resolve();
      });
    });
  },

  async logAll() {
    return new Promise<any>((resolve, reject) => {
      const local = chrome.storage.local;
      local.get((result) => {
        if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
        console.log("ALL DATA LOCAL STORAGE CHROME => ");
        console.log(result);
        resolve(result);
      });
    });
  },
};

export default Storage;
