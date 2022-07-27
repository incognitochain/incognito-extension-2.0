if (shouldInjectProvider()) {
  injectScript(chrome.runtime.getURL("static/js/inpage.js")); //"inpage.js")
}

function injectScript(url: string) {
  try {
    const container = document.head || document.documentElement;
    const scriptTag = document.createElement("script");
    scriptTag.setAttribute("src", url);
    scriptTag.setAttribute("async", "false");
    container.insertBefore(scriptTag, container.children[0]);
    //container.removeChild(scriptTag)
  } catch (e) {
    console.log("E ", e);
  }
}

function shouldInjectProvider() {
  return true;
}

export default {};
