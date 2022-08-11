export const getActiveTabs = () => {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true }, (tabs) => {
      return resolve(tabs);
    });
  });
};

export const getLastFocusedWindow = () => {
  return new Promise((resolve) => {
    chrome.windows.getLastFocused((windowObject) => {
      return resolve(windowObject);
    });
  });
};

export const closeExtensionPopup = () => {
  return chrome.windows.getCurrent((windowDetails: any) => {
    if (windowDetails?.type === "popup") {
      return chrome.windows.remove(windowDetails.id);
    }
    return true;
  });
};

export const queryCurrentActiveTab = () => {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const [activeTab] = tabs;
      const { url = "" } = activeTab;
      const parsedUrl = new URL(url) || {};
      const { origin, pathname } = parsedUrl;
      if (!origin || origin === "null" || pathname === "/index.html") {
        resolve(null);
        return;
      }
      resolve(activeTab);
    });
  });
};

export const getURL = (url?: string) => {
  if (!url) return null;
  return new URL(url);
};

export const getQueryString = () => (typeof window !== "undefined" ? window.location.search : "");

export const getURLSearchParams = (search?: string) => {
  if (typeof window === "undefined") {
    return {};
  }
  return new URLSearchParams(search || window.location.search);
};

export const isContainsQueryString = (queryString: string) => {
  if (typeof window === "undefined") {
    return false;
  }
  return window.location.search.indexOf(queryString) > -1;
};

export const isTab = () => {
  return window.location.hash === "#window";
};

export const openAsTab = (url = "index.html#window") => {
  if (chrome && chrome.tabs && chrome.tabs.create) {
    chrome.tabs.create({ url: chrome.extension.getURL(url) });
  }
};

export const closeCurrentTab = () => {
  if (window && window.close) {
    window.close();
  }
};

export const handleClassForTab = () => {
  // try {
  //   const root: any = document.querySelector("#root");
  //   if (!root.classList.contains("incognito-extension-tab")) {
  //     root.classList.add("incognito-extension-tab");
  //   }
  // } catch (error) {
  //   console.debug(error);
  // }
};

export const handleClassForEdge = () => {
  // try {
  //   const className = "edge-browser";
  //   const root: any = document.querySelector("#root");
  //   if (!root.classList.contains(className)) {
  //     root.classList.add(className);
  //   }
  // } catch (error) {
  //   console.debug(error);
  // }
};

export const reloadApp = () => {
  if (typeof window !== "undefined") {
    window.location.href = "";
  }
};
