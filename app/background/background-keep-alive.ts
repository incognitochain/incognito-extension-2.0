let lifeline: any;

keepAlive();
async function retryOnTabUpdate(tabId: any, info: any, tab: any) {
  if (info.url && /^(file|https?):/.test(info.url)) {
    console.log("call keepAlive() ");
    keepAlive();
  }
}
chrome.runtime.onConnect.addListener((port: any) => {
  if (port.name === "keepAlive") {
    lifeline = port;
    setTimeout(keepAliveForced, 295e3); // 5 minutes minus 5 seconds
    port.onDisconnect.addListener(keepAliveForced);
  }
});

function keepAliveForced() {
  console.log("call keepAliveForced ");
  lifeline?.disconnect();
  lifeline = null;
  keepAlive();
}

async function keepAlive() {
  if (lifeline) return;
  console.log("call keepAlive ");
  for (const tab of await chrome.tabs.query({ url: "*://*/*" })) {
    console.log("keepAlive tab ", tab);
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id || 0 },
        func: () => chrome.runtime.connect({ name: "keepAlive" }),
        // `function` will become `func` in Chrome 93+
      });
      chrome.tabs.onUpdated.removeListener(retryOnTabUpdate);
      return;
    } catch (e) {
      console.log("EEEE ", e);
    }
  }
  chrome.tabs.onUpdated.addListener(retryOnTabUpdate);
}

export {};
