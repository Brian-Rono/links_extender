// contentScript.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "getLinks") {
    const links = Array.from(document.querySelectorAll("a")).map((a) => a.href);
    sendResponse({ links: links });
  }
});
